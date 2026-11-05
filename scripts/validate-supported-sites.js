#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

const rows = {
  x: ["x.com", "vxtwitter.com", "scope-all"],
  reddit: ["reddit.com", "vxreddit.com", "scope-all"],
  pixiv: ["pixiv.net", "phixiv.net", "scope-all"],
  bilibili: ["bilibili.com", "vxbilibili.com", "scope-all"],
  facebook: ["facebook.com", "facebed.com", "scope-web-mobile"],
  instagram: ["instagram.com", "instagramx.com", "scope-web-mobile"],
  youtube: ["youtube.com", "youtu.be", "scope-web-mobile"],
};

requireCondition(html.includes('data-i18n="table-th4"'), "supported-sites table is missing scope header");
for (const [site, tokens] of Object.entries(rows)) {
  const match = html.match(new RegExp(`<tr[^>]*data-site="${site}"[\\s\\S]*?<\\/tr>`));
  requireCondition(match, `missing supported-sites row for ${site}`);
  for (const token of tokens) {
    requireCondition(match[0].includes(token), `${site} row is missing ${token}`);
  }
}

for (const key of ["table-th4", "scope-all", "scope-web-mobile", "youtube-cleanup"]) {
  const count = (script.match(new RegExp(`"${key}"\\s*:`, "g")) || []).length;
  requireCondition(count === 8, `${key} must be translated in all 8 locales; found ${count}`);
}

console.log("PASS supported-site scope table");
