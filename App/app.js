(() => {
  "use strict";

  const STORE_KEY = "vx-mobile-web-settings-v1";
  const HISTORY_KEY = "vx-mobile-web-history-v1";
  const TRACKERS = new Set([
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "utm_custom",
    "spm_id_from", "from_spmid", "from_spmid_from", "spmid", "spmid_from", "share_spmid", "vd_source",
    "buvid", "buvid_from", "share_source", "share_source_mutation", "share_medium", "share_plat",
    "share_session_id", "share_tag", "share_tag_id", "share_id", "share_medium_id", "share_plat_id",
    "share_channel", "share_token", "share_origin", "share_session", "ref_src", "refer_url", "mao2_medium",
    "mao2_source", "cover_shid", "shid", "track_id", "signCoverage", "msource", "bsource", "ssource",
    "csource", "vc_name", "vc_source", "ha_source", "ha_method", "camp_id", "promotion_id", "ttk_id",
    "union_source", "branch_pid", "fromsource"
  ]);
  const SITE_TRACKERS = new Set(["s", "from", "goto", "forward", "intro", "network", "platform", "session_id", "timestamp", "ts", "fr", "nm", "mx", "attach", "argv", "extension", "screenName", "seid", "plat_id", "webid", "bbid", "unique_k", "is_story_h5", "auto_play", "wifiAutoPlay", "preview_template", "mobile_pkg", "t"]);
  const BILI_ALLOWED = new Set(["p", "t", "ep_id", "season_id", "ssid", "cid", "aid", "bvid"]);

  const $ = (id) => document.getElementById(id);
  const state = { settings: loadSettings(), result: null, deferredInstall: null };

  function loadSettings() {
    return { mode: "recommended", saveHistory: true, convertedOnly: false, siteX: true, siteReddit: true, siteBilibili: true, sitePixiv: true, redditDomain: "vxreddit.com", ...safeJson(localStorage.getItem(STORE_KEY), {}) };
  }
  function saveSettings() { localStorage.setItem(STORE_KEY, JSON.stringify(state.settings)); }
  function history() { return safeJson(localStorage.getItem(HISTORY_KEY), []); }
  function setHistory(items) { localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 100))); }
  function safeJson(raw, fallback) { try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
  function normalizeHost(host) { return host.toLowerCase().replace(/^www\./, ""); }
  function stripParams(url, blocked, cleaned) { [...url.searchParams.keys()].forEach((key) => { if (blocked.has(key)) { url.searchParams.delete(key); cleaned.add(key); } }); }
  function allowOnly(url, allowed, cleaned) { [...url.searchParams.keys()].forEach((key) => { if (!allowed.has(key)) { url.searchParams.delete(key); cleaned.add(key); } }); }

  function convert(input) {
    const raw = input.trim();
    if (!raw) return { ok: false, error: "empty input" };
    let url;
    try { url = new URL(raw); } catch { return { ok: false, error: "invalid URL" }; }
    const original = url.toString();
    const cleaned = new Set();
    stripParams(url, TRACKERS, cleaned);
    const host = normalizeHost(url.hostname);
    let siteKey = "generic", siteLabel = "Generic cleanup", note = "";

    if (["x.com", "twitter.com", "mobile.x.com", "mobile.twitter.com"].includes(host) && state.settings.siteX) {
      stripParams(url, SITE_TRACKERS, cleaned); url.hostname = "vxtwitter.com"; url.hash = ""; siteKey = "x"; siteLabel = "X / Twitter";
    } else if ((host === "reddit.com" || host.endsWith(".reddit.com")) && state.settings.siteReddit) {
      stripParams(url, SITE_TRACKERS, cleaned); url.hostname = state.settings.redditDomain; url.hash = ""; siteKey = "reddit"; siteLabel = "Reddit";
    } else if (host === "pixiv.net" && state.settings.sitePixiv) {
      stripParams(url, SITE_TRACKERS, cleaned); url.hostname = "phixiv.net"; url.hash = ""; siteKey = "pixiv"; siteLabel = "Pixiv";
    } else if ((host === "bilibili.com" || host.endsWith(".bilibili.com") || host === "b23.tv") && state.settings.siteBilibili) {
      siteKey = "bilibili"; siteLabel = "Bilibili";
      if (host === "b23.tv") {
        stripParams(url, SITE_TRACKERS, cleaned);
        note = "b23.tv 是移动端 Bilibili 短链，Web App 本地不联网展开，已清理可识别参数并保留短链。";
      } else {
        allowOnly(url, BILI_ALLOWED, cleaned); url.hostname = "vxbilibili.com"; url.hash = "";
      }
    }
    const output = siteKey === "generic" ? url.toString() : url.toString().replace(/\/+$/, "");
    return { ok: true, changed: output !== original, input: raw, output, siteKey, siteLabel, cleaned: [...cleaned].sort(), note };
  }

  async function readClipboard() {
    if (!navigator.clipboard?.readText) throw new Error("Clipboard readText is not available in this browser/context.");
    return navigator.clipboard.readText();
  }
  async function writeClipboard(text) {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard writeText is not available in this browser/context.");
    return navigator.clipboard.writeText(text);
  }
  function renderResult(result) {
    state.result = result;
    if (!result.ok) { toast(result.error); return; }
    $("resultCard").hidden = false;
    $("siteBadge").textContent = result.siteLabel;
    $("cleanedCount").textContent = `${result.cleaned.length} params cleaned`;
    $("originalUrl").textContent = result.input;
    $("convertedUrl").textContent = result.output;
    $("openBtn").href = result.output;
    $("resultNote").hidden = !result.note;
    $("resultNote").textContent = result.note;
  }
  async function convertAndCopy(text, autoSave = true) {
    const result = convert(text);
    renderResult(result);
    if (!result.ok) return;
    if (result.changed) {
      try { await writeClipboard(result.output); toast("已转换并复制到剪贴板"); } catch (err) { toast(`已转换，但复制失败：${err.message}`); }
      if (autoSave && state.settings.saveHistory) saveHistory(result);
    } else {
      toast("没有可转换内容，已显示清理结果");
    }
  }
  function saveHistory(result) {
    if (!result?.ok) return;
    const item = { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, createdAt: new Date().toISOString(), siteLabel: result.siteLabel, original: state.settings.convertedOnly ? "" : result.input, output: result.output, cleaned: result.cleaned };
    setHistory([item, ...history()]); renderHistory();
  }
  function renderHistory() {
    const list = $("historyList"); const items = history();
    if (!items.length) { list.innerHTML = '<div class="history-empty">暂无历史。转换后可自动保存，或手动保存当前结果。</div>'; return; }
    list.innerHTML = items.map((item) => `<article class="history-item"><header><strong>${escapeHtml(item.siteLabel)}</strong><time>${new Date(item.createdAt).toLocaleString()}</time></header>${item.original ? `<p class="muted">${escapeHtml(item.original)}</p>` : ""}<code>${escapeHtml(item.output)}</code><div class="button-row compact"><button class="secondary-btn" data-copy="${escapeHtml(item.output)}">Copy</button><button class="secondary-btn" data-del="${item.id}">Delete</button></div></article>`).join("");
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function toast(message) { const el = $("toast"); el.textContent = message; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { el.hidden = true; }, 3300); }
  function updateDebug() {
    $("debugOutput").textContent = JSON.stringify({ userAgent: navigator.userAgent, standalone: window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true, clipboardRead: Boolean(navigator.clipboard?.readText), clipboardWrite: Boolean(navigator.clipboard?.writeText), webShare: Boolean(navigator.share), serviceWorker: "serviceWorker" in navigator, settings: state.settings, historyCount: history().length }, null, 2);
  }
  function selfTest() {
    const cases = [
      ["https://x.com/user/status/1?s=20&t=abc", "https://vxtwitter.com/user/status/1"],
      ["https://reddit.com/r/a/comments/b/c/?utm_source=share", `https://${state.settings.redditDomain}/r/a/comments/b/c`],
      ["https://www.bilibili.com/video/BV1/?spm_id_from=1&p=2&vd_source=x", "https://vxbilibili.com/video/BV1/?p=2"],
      ["https://b23.tv/AbCd?share_source=copy_link", "https://b23.tv/AbCd"],
      ["https://www.pixiv.net/artworks/123?utm_source=x", "https://phixiv.net/artworks/123"]
    ];
    return cases.map(([input, expected]) => ({ input, expected, actual: convert(input).output, pass: convert(input).output === expected }));
  }
  function bindSettings() {
    document.querySelector(`input[name="mode"][value="${state.settings.mode}"]`).checked = true;
    ["saveHistory", "convertedOnly", "siteX", "siteReddit", "siteBilibili", "sitePixiv"].forEach((id) => { $(id).checked = state.settings[id]; $(id).addEventListener("change", () => { state.settings[id] = $(id).checked; saveSettings(); updateDebug(); }); });
    $("redditDomain").value = state.settings.redditDomain;
    $("redditDomain").addEventListener("change", () => { state.settings.redditDomain = $("redditDomain").value; saveSettings(); updateDebug(); });
    document.querySelectorAll('input[name="mode"]').forEach((input) => input.addEventListener("change", () => { state.settings.mode = input.value; saveSettings(); updateDebug(); }));
  }

  function boot() {
    bindSettings(); renderHistory(); updateDebug();
    $("capabilityBadge").textContent = navigator.clipboard ? "clipboard API" : "manual only";
    $("pasteConvertBtn").addEventListener("click", async () => { try { await convertAndCopy(await readClipboard()); } catch (err) { toast(err.message); } });
    $("convertInputBtn").addEventListener("click", () => convertAndCopy($("sourceInput").value));
    $("copyBtn").addEventListener("click", async () => { if (state.result?.ok) { await writeClipboard(state.result.output); toast("已复制结果"); } });
    $("saveBtn").addEventListener("click", () => { if (state.result?.ok) { saveHistory(state.result); toast("已保存历史"); } });
    $("webShareBtn").addEventListener("click", async () => { if (!state.result?.ok) return; if (navigator.share) await navigator.share({ title: "VX Link", text: state.result.output, url: state.result.output }); else toast("当前浏览器不支持 Web Share API"); });
    $("clearHistoryBtn").addEventListener("click", () => { setHistory([]); renderHistory(); updateDebug(); });
    $("historyList").addEventListener("click", async (event) => { const copy = event.target.closest("[data-copy]"); const del = event.target.closest("[data-del]"); if (copy) { await writeClipboard(copy.dataset.copy); toast("已复制历史链接"); } if (del) { setHistory(history().filter((item) => item.id !== del.dataset.del)); renderHistory(); updateDebug(); } });
    $("debugToggle").addEventListener("click", () => { $("debugPanel").hidden = !$("debugPanel").hidden; updateDebug(); });
    $("runSelfTestBtn").addEventListener("click", () => { $("debugOutput").textContent = JSON.stringify({ selfTest: selfTest(), debug: safeJson($("debugOutput").textContent, {}) }, null, 2); });
    window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); state.deferredInstall = event; $("installBtn").hidden = false; });
    $("installBtn").addEventListener("click", async () => { if (state.deferredInstall) { state.deferredInstall.prompt(); state.deferredInstall = null; $("installBtn").hidden = true; } });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
    window.addEventListener("focus", async () => { if (state.settings.mode === "fast") { try { await convertAndCopy(await readClipboard()); } catch { /* browser may reject without user gesture */ } } });
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
