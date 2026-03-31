const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const envPath = path.join(process.cwd(), ".env");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf("=");
    if (idx < 1) continue;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadDotEnv(envPath);

const required = ["SUPABASE_ACCESS_TOKEN", "SUPABASE_PROJECT_REF"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`[supabase-mcp] Missing env vars in .env: ${missing.join(", ")}`);
  process.exit(1);
}

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["-y", "@supabase/mcp-server-supabase"],
  {
    stdio: "inherit",
    env: process.env,
  },
);

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (error) => {
  console.error("[supabase-mcp] Failed to start:", error.message);
  process.exit(1);
});
