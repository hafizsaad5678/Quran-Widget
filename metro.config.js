// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Translations ship as assets (.qtr = compact JSON), not inside the JS bundle.
config.resolver.assetExts.push("qtr");

module.exports = withNativeWind(config, { input: "./global.css" });
