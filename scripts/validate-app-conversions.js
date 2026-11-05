#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const appSource = fs.readFileSync(path.join(root, "App", "app.js"), "utf8");
const cases = JSON.parse(fs.readFileSync(path.join(root, "App", "conversion_cases.json"), "utf8"));

function loadConverter(initialSettings = {}) {
  const storage = new Map([
    ["vx-mobile-web-settings-v2", JSON.stringify(initialSettings)],
  ]);
  const context = {
    console,
    URL,
    Set,
    Map,
    Date,
    JSON,
    Math,
    crypto: { randomUUID: () => "test-id" },
    navigator: { language: "en", clipboard: {} },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
    },
    document: {
      addEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      documentElement: {},
    },
    window: {
      matchMedia: () => ({ matches: false }),
      scrollTo: () => {},
    },
    setTimeout,
    clearTimeout,
  };
  vm.createContext(context);
  vm.runInContext(appSource, context, { filename: "App/app.js" });
  if (!context.VXWebConverter || typeof context.VXWebConverter.convert !== "function") {
    throw new Error("App/app.js must expose VXWebConverter.convert for parity tests");
  }
  return context.VXWebConverter;
}

let failed = 0;
const converter = loadConverter();
for (const item of cases) {
  const result = converter.convert(item.input);
  const errors = [];
  if (result.output !== item.expected) errors.push(`output ${result.output} != ${item.expected}`);
  if (item.expectedSiteKey !== undefined && result.siteKey !== item.expectedSiteKey) {
    errors.push(`siteKey ${result.siteKey} != ${item.expectedSiteKey}`);
  }
  if (item.expectedChanged !== undefined && result.changed !== item.expectedChanged) {
    errors.push(`changed ${result.changed} != ${item.expectedChanged}`);
  }
  if (errors.length) {
    failed += 1;
    console.error(`FAIL ${item.name}\n  ${errors.join("\n  ")}`);
  }
}

const disabledCases = [
  ["siteFacebook", "https://facebook.com/share/p/1?mibextid=track"],
  ["siteInstagram", "https://instagram.com/reel/ABC?igsh=track"],
  ["siteYouTube", "https://youtu.be/abc?si=track"],
];
for (const [setting, input] of disabledCases) {
  const result = loadConverter({ [setting]: false }).convert(input);
  if (result.output !== input || result.changed || result.siteKey !== "generic") {
    failed += 1;
    console.error(`FAIL disabled ${setting}\n  ${JSON.stringify(result)}`);
  }
}

if (failed) process.exit(1);
console.log(`PASS ${cases.length} web conversion fixtures and ${disabledCases.length} disabled toggles`);
