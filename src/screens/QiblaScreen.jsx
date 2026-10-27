/**
 * QiblaScreen: compass that points to the Kaaba.
 * Heading: the OS sensor-fusion heading (expo-location: tilt-compensated and
 * relative to TRUE north), with the raw magnetometer (expo-sensors) as a
 * fallback. Position: expo-location, cached so it works offline.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Magnetometer } from "expo-sensors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Linking,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { kaabaDistanceKm, qiblaBearing, shortestTurn } from "../utils/qibla";

const COORDS_KEY = "qibla:lastCoords";
const ALIGNED_ENTER = 4; // degrees: becomes "aligned"
const ALIGNED_EXIT = 8; // degrees: hysteresis, so it does not flicker
const SMOOTHING = 0.22; // 0..1, higher = faster but jumpier

// Magnetometer (x, y) -> compass heading, 0 = north, clockwise.
const headingFromMagnetometer = ({ x, y }) => {
  let angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle < 0) angle += 360;
  const heading = angle - 90;
  return heading >= 0 ? heading : heading + 360;
};

export default function QiblaScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const size = Math.min(width - 48, 320);

  const [coords, setCoords] = useState(null); // { lat, lon }
  const [locState, setLocState] = useState("loading"); // loading | ready | denied | error
  const [heading, setHeading] = useState(0); // throttled, for text only
  const [aligned, setAligned] = useState(false);
  const [sensorOk, setSensorOk] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [calibration, setCalibration] = useState(3); // 0 (bad) .. 3 (good)

  // The dial turns through a native Animated value, so no re-render per sample.
  const [rotation] = useState(() => new Animated.Value(0)); // unwrapped degrees
  const unwrapped = useRef(0);
  const filtered = useRef(null); // { x, y } circular low-pass state
  const lastStateUpdate = useRef(0);
  const bearingRef = useRef(null);

  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        // Cached position first: instant, and works with no GPS/internet.
        const cached = await AsyncStorage.getItem(COORDS_KEY);
        if (cached && active) {
          setCoords(JSON.parse(cached));
          setLocState("ready");
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (!cached && active) setLocState("denied");
          return;
        }
        if (active) setPermissionGranted(true);

        const last = await Location.getLastKnownPositionAsync();
        const position =
          last ||
          (await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          }));
        const next = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        if (!active) return;
        setCoords(next);
        setLocState("ready");
        await AsyncStorage.setItem(COORDS_KEY, JSON.stringify(next));
      } catch (_error) {
        if (active) setLocState((prev) => (prev === "ready" ? prev : "error"));
      }
    };
    void run();
    return () => {
      active = false;
    };
  }, [retryKey]);

  const retryLocation = () => {
    setLocState("loading");
    setRetryKey((k) => k + 1);
  };

  const bearing = coords ? qiblaBearing(coords.lat, coords.lon) : null;

  useEffect(() => {
    bearingRef.current = bearing;
  }, [bearing]);

  // One incoming heading sample (degrees, 0 = north): smooth it, then animate.
  const applyHeading = useCallback(
    (raw) => {
      if (typeof raw !== "number" || Number.isNaN(raw) || raw < 0) return;
      const rad = (raw * Math.PI) / 180;

      // Circular low-pass: filter sin/cos, so 359 -> 1 degrees never swings round.
      if (!filtered.current) {
        filtered.current = { x: Math.cos(rad), y: Math.sin(rad) };
      } else {
        filtered.current.x += (Math.cos(rad) - filtered.current.x) * SMOOTHING;
        filtered.current.y += (Math.sin(rad) - filtered.current.y) * SMOOTHING;
      }
      const smooth =
        ((Math.atan2(filtered.current.y, filtered.current.x) * 180) / Math.PI +
          360) %
        360;

      // Keep the animated angle continuous (no spin back across 0/360).
      const current = ((unwrapped.current % 360) + 360) % 360;
      const delta = ((smooth - current + 540) % 360) - 180;
      if (Math.abs(delta) < 0.4) return; // dead zone: ignore sensor noise
      unwrapped.current += delta;
      Animated.timing(rotation, {
        toValue: unwrapped.current,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

      // Text / alignment only ~8 times a second.
      const now = Date.now();
      if (now - lastStateUpdate.current > 120) {
        lastStateUpdate.current = now;
        setHeading(smooth);
        const target = bearingRef.current;
        if (target !== null) {
          const off = Math.abs(shortestTurn(smooth, target));
          setAligned((prev) => (prev ? off <= ALIGNED_EXIT : off <= ALIGNED_ENTER));
        }
      }
    },
    [rotation],
  );

  useEffect(() => {
    if (!permissionGranted) return undefined;
    let active = true;
    let headingSub = null;
    let magSub = null;

    const startMagnetometer = async () => {
      const available = await Magnetometer.isAvailableAsync();
      if (!active) return;
      if (!available) {
        setSensorOk(false);
        return;
      }
      Magnetometer.setUpdateInterval(50);
      magSub = Magnetometer.addListener((data) =>
        applyHeading(headingFromMagnetometer(data)),
      );
    };

    const start = async () => {
      try {
        // Preferred: OS fusion heading (tilt-compensated, true north).
        headingSub = await Location.watchHeadingAsync((h) => {
          if (!active) return;
          setCalibration(typeof h.accuracy === "number" ? h.accuracy : 3);
          applyHeading(h.trueHeading >= 0 ? h.trueHeading : h.magHeading);
        });
      } catch (_error) {
        await startMagnetometer();
      }
    };
    void start();

    return () => {
      active = false;
      headingSub?.remove();
      magSub?.remove();
    };
  }, [permissionGranted, applyHeading]);

  const distance = coords ? kaabaDistanceKm(coords.lat, coords.lon) : null;
  const turn = bearing === null ? null : shortestTurn(heading, bearing);

  useEffect(() => {
    if (aligned) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [aligned]);

  // Dial turns opposite to the heading, so N always points to true north.
  const rotateDeg = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });

  const message = () => {
    if (turn === null) return "";
    if (aligned) return "You are facing the Qibla";
    const deg = Math.round(Math.abs(turn));
    return turn < 0 ? `Turn ${deg}° left` : `Turn ${deg}° right`;
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        <TopBar
          title="Qibla"
          leftIcon="chevron-left"
          onLeftPress={() => router.back()}
        />

        <View className="flex-1 items-center justify-center px-6">
          {locState === "loading" && !coords ? (
            <ActivityIndicator size="large" color={theme.accent} />
          ) : null}

          {(locState === "denied" || locState === "error") && !coords ? (
            <View className="items-center">
              <MaterialCommunityIcons
                name="map-marker-off-outline"
                size={44}
                color={theme.accent}
              />
              <Text
                className="mt-4 text-base font-bold text-center"
                style={{ color: theme.accent }}
              >
                Location needed
              </Text>
              <Text
                className="mt-2 text-sm text-center leading-6"
                style={{ color: theme.textSecondary }}
              >
                Qibla direction is calculated from where you are. Location is
                used on your device only.
              </Text>
              <TouchableOpacity
                onPress={locState === "denied" ? () => Linking.openSettings() : retryLocation}
                className="mt-5 rounded-full px-6 py-3"
                style={{ backgroundColor: theme.accent }}
              >
                <Text className="text-sm font-bold" style={{ color: theme.onAccent }}>
                  {locState === "denied" ? "Open settings" : "Try again"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {coords && bearing !== null ? (
            <>
              {/* Fixed pointer: the direction the phone is facing */}
              <MaterialCommunityIcons
                name="menu-down"
                size={34}
                color={aligned ? theme.accent : theme.textSecondary}
                style={{ marginBottom: -8 }}
              />

              {/* Dial: rotates opposite to the heading so N always points north */}
              <Animated.View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: aligned ? 3 : 1,
                  borderColor: aligned ? theme.accent : theme.border,
                  backgroundColor: theme.cardBackground,
                  transform: [{ rotate: rotateDeg }],
                }}
              >
                {[
                  { label: "N", deg: 0 },
                  { label: "E", deg: 90 },
                  { label: "S", deg: 180 },
                  { label: "W", deg: 270 },
                ].map((c) => (
                  <View
                    key={c.label}
                    pointerEvents="none"
                    style={{
                      position: "absolute",
                      width: size,
                      height: size,
                      alignItems: "center",
                      transform: [{ rotate: `${c.deg}deg` }],
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: "800",
                        color: c.label === "N" ? theme.accent : theme.textSecondary,
                      }}
                    >
                      {c.label}
                    </Text>
                  </View>
                ))}

                {/* Qibla marker at its bearing on the ring */}
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    alignItems: "center",
                    transform: [{ rotate: `${bearing}deg` }],
                  }}
                >
                  <View
                    style={{
                      marginTop: 34,
                      width: 46,
                      height: 46,
                      borderRadius: 23,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.accent,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="mosque"
                      size={26}
                      color={theme.onAccent}
                    />
                  </View>
                  <View
                    style={{
                      width: 2,
                      height: size / 2 - 96,
                      backgroundColor: theme.accent,
                      opacity: 0.5,
                    }}
                  />
                </View>

                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    top: size / 2 - 5,
                    left: size / 2 - 5,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.accent,
                  }}
                />
              </Animated.View>

              <Text
                className="mt-8 text-xl font-bold text-center"
                style={{ color: aligned ? theme.accent : theme.text }}
              >
                {message()}
              </Text>
              <Text className="mt-2 text-xs text-center" style={{ color: theme.textSecondary }}>
                Qibla {Math.round(bearing)}° from north
                {distance ? `  ·  ${Math.round(distance).toLocaleString()} km to Makkah` : ""}
              </Text>
              <Text
                className="mt-5 px-4 text-[11px] text-center leading-5"
                style={{ color: theme.textSecondary }}
              >
                {!sensorOk
                  ? "This device has no compass sensor, so only the Qibla angle is shown."
                  : calibration <= 1
                    ? "Compass needs calibration: move your phone in a figure 8 a few times, away from metal or magnets."
                    : "Hold your phone flat and away from metal or magnets for the best accuracy."}
              </Text>
              <Text
                className="mt-3 px-4 text-[11px] text-center leading-5"
                style={{ color: theme.accent, fontStyle: "italic" }}
              >
                For a mosque or any important place, please also confirm the
                direction another way (for example, the mosque&apos;s mihrab).
              </Text>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
