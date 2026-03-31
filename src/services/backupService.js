import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { BACKUP_KEYS } from "../constants/storageKeys";

const BACKUP_VERSION = 1;

export const exportBackupToFile = async () => {
  const keys = BACKUP_KEYS;
  const entries = await AsyncStorage.multiGet(keys);
  const payload = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: Object.fromEntries(entries),
  };

  const json = JSON.stringify(payload, null, 2);
  const dir = FileSystem.cacheDirectory || FileSystem.documentDirectory;
  if (!dir) throw new Error("No writable app directory found");

  const fileUri = `${dir}quran-daily-ayah-backup.json`;
  await FileSystem.writeAsStringAsync(fileUri, json, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri, {
      mimeType: "application/json",
      dialogTitle: "Export Quran Daily Ayah Backup",
      UTI: "public.json",
    });
  }

  return fileUri;
};

export const importBackupFromFile = async () => {
  const picked = await DocumentPicker.getDocumentAsync({
    type: "application/json",
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (picked.canceled || !picked.assets?.[0]?.uri) {
    return { imported: false, reason: "canceled" };
  }

  const uri = picked.assets[0].uri;
  const raw = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  const parsed = JSON.parse(raw);

  if (!parsed?.data || typeof parsed.data !== "object") {
    throw new Error("Invalid backup format");
  }

  const updates = Object.entries(parsed.data)
    .filter(([key]) => BACKUP_KEYS.includes(key))
    .map(([key, value]) => [key, value == null ? "" : String(value)]);

  await AsyncStorage.multiSet(updates);
  return { imported: true, count: updates.length };
};
