/** Qibla direction math (great-circle initial bearing to the Kaaba). */
const KAABA = { lat: 21.422487, lon: 39.826206 };
const toRad = (d) => (d * Math.PI) / 180;
const toDeg = (r) => (r * 180) / Math.PI;

/** Bearing in degrees clockwise from true north, 0-360. */
export const qiblaBearing = (lat, lon) => {
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA.lat);
  const dLon = toRad(KAABA.lon - lon);
  const y = Math.sin(dLon) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};

/** Distance to the Kaaba in km. */
export const kaabaDistanceKm = (lat, lon) => {
  const R = 6371;
  const dLat = toRad(KAABA.lat - lat);
  const dLon = toRad(KAABA.lon - lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

/** Smallest signed turn (degrees) from heading to target: negative = turn left. */
export const shortestTurn = (heading, target) =>
  ((target - heading + 540) % 360) - 180;
