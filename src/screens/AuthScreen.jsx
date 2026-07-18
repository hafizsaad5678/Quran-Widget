import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { signIn, signUp } from "../services/authService";
import { pullUserDataFromCloud } from "../services/cloudSyncService";
import { isSupabaseConfigured } from "../services/supabaseClient";

export default function AuthScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { show, showAlert } = useToast();
  const params = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(params?.mode === "signup");
  const authEnabled = isSupabaseConfigured;

  useEffect(() => {
    setIsSignUp(params?.mode === "signup");
  }, [params?.mode]);

  const handleAuth = async () => {
    if (!authEnabled) {
      (showAlert ?? show)({
        title: "Offline Mode",
        message:
          "Cloud auth is not configured. Continuing without account sync.",
        type: "info",
      });
      router.replace("/(tabs)/");
      return;
    }

    if (!email || !password) {
      show({ type: "warning", message: "Please enter email and password." });
      return;
    }
    if (isSignUp && !displayName.trim()) {
      show({ type: "warning", message: "Please enter your name." });
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await signUp(
          email,
          password,
          displayName.trim(),
        );
        if (error) throw error;

        // Supabase can create a user without an active session when email confirmation is required.
        if (data?.session) {
          await pullUserDataFromCloud();
          show({
            type: "success",
            title: "Welcome!",
            message: "Account created. Your data is synced.",
          });
          router.replace("/(tabs)/");
        } else {
          setIsSignUp(false);
          (showAlert ?? show)({
            type: "info",
            title: "Account Created",
            message: "Please verify your email, then sign in.",
          });
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) throw error;

        if (!data?.session) {
          throw new Error("Sign in did not create a valid session.");
        }

        await pullUserDataFromCloud();
        (showAlert ?? show)({
          title: "Welcome back",
          message: "Logged in successfully.",
        });
        router.replace("/(tabs)/");
      }
    } catch (err) {
      show({
        type: "error",
        title: "Authentication Failed",
        message: err.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <TopBar
        title={isSignUp ? "Create Account" : "Sign In"}
        leftIcon="chevron-left"
        onLeftPress={() => router.replace("/onboarding")}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            {isSignUp ? "Create Account" : "Sign In"}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {!authEnabled
              ? "Cloud auth is unavailable in this build. Continue in offline mode."
              : isSignUp
                ? "Create an account to sync your journey."
                : "Welcome back to your daily reflection."}
          </Text>

          {isSignUp && (
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.secondary,
                },
              ]}
              placeholder="Your name"
              placeholderTextColor={theme.textDisabled}
              autoCapitalize="words"
              value={displayName}
              onChangeText={setDisplayName}
              editable={authEnabled}
            />
          )}

          <TextInput
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: theme.border,
                backgroundColor: theme.secondary,
              },
            ]}
            placeholder="Email address"
            placeholderTextColor={theme.textDisabled}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={authEnabled}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: theme.border,
                backgroundColor: theme.secondary,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={theme.textDisabled}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={authEnabled}
          />

          <TouchableOpacity
            style={[styles.authButton, { backgroundColor: theme.accent }]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.authButtonText}>
                {authEnabled
                  ? isSignUp
                    ? "Sign Up"
                    : "Sign In"
                  : "Continue Offline"}
              </Text>
            )}
          </TouchableOpacity>

          {authEnabled ? (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsSignUp(!isSignUp)}
            >
              <Text style={[styles.toggleText, { color: theme.textSecondary }]}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: "Amiri-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 16,
  },
  authButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  authButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  toggleButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  toggleText: {
    fontSize: 14,
  },
});
