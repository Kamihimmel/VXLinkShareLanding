// Multilingual content and small interactive enhancements for the static landing page.
const i18nData = {
    zh: {
        "language-label": "语言",
        "nav-features": "功能特点",
        "nav-platforms": "支持平台",
        "hero-title": "分享更干净、更安全的链接",
        "hero-subtitle": "轻量级、保护隐私的浏览器扩展。自动剥离各类隐藏追踪参数，并为 X、Bilibili、Reddit 和 Pixiv 生成对社交软件更友好的卡片预览链接。",
        "store-chrome-small": "查看源码",
        "store-firefox-small": "查看源码",
        "store-safari-small": "查看源码",
        "store-zip-small": "开发者模式",
        "btn-chrome": "Chrome 版本说明",
        "btn-firefox": "Firefox 版本说明",
        "btn-safari": "Safari 版本说明",
        "btn-zip": "下载发布包",
        "preview-original": "原始链接:",
        "preview-arrow": "⬇️ 自动净化参数并重写域名",
        "preview-vx": "VX 净化链接:",
        "url-original": "https://www.bilibili.com/video/BV1xx411c7xx/?spm_id_from=333.788&share_source=copy_web&vd_source=123456",
        "url-vx": "https://vxbilibili.com/video/BV1xx411c7xx/",
        "features-title": "为什么选择 VX Link Helper？",
        "feat1-title": "🔒 纯本地保护",
        "feat1-desc": "100% 运行在浏览器本地，不向外发起任何网络请求。在复制的瞬间剥离隐藏在链接内部的用户行为追踪令牌。",
        "feat2-title": "✨ 完美卡片渲染",
        "feat2-desc": "自动将支持的网站域名转换为兼容的预览代理（如 vxtwitter），确保在 Discord、Telegram 等聊天软件中直接展现完整的媒体卡片。",
        "feat3-title": "⚡ 原生级内嵌",
        "feat3-desc": "利用高效的 DOM 监听，无感地在目标网站原生分享按钮旁注入快捷的“VX”一键复制按钮，极速流畅。",
        "platforms-title": "已支持的域名转换",
        "table-th1": "平台",
        "table-th2": "原始域名",
        "table-th3": "转换后防追踪/卡片域名",
        "footer-docs": "项目说明",
        "footer-text": "VX Link Helper 承诺完全开源、本地运行且无任何潜在数据追踪。",
        "footer-privacy": "隐私政策",
        "p-title": "隐私政策",
        "p-intro": "VX Link Helper 扩展程序在开发设计上将用户的“绝对隐私”放在首位。本政策阐明了本扩展不涉及任何用户数据的处理逻辑：",
        "p-h1": "1. 零数据收集",
        "p-d1": "我们<b>不会收集、存储、上传、传输或销售</b>您的任何个人信息、浏览历史或剪贴板内容。扩展程序没有后台统计、没有行为分析脚本，更没有设立任何远程服务器。",
        "p-h2": "2. 本地化运行架构",
        "p-d2": "所有的链接参数剥离和重写操作（如过滤 Bilibili 追踪代码、重定向 Reddit 链接）全部由您本地设备的浏览器底层沙盒隔离执行，数据完全属于您自己。",
        "p-h3": "3. 权限合规说明",
        "p-d3": "本扩展申请的专用权限仅为实现对应原生功能，绝无滥用：",
        "p-l1": "contextMenus: 用于在右键菜单中生成“复制 VX 链接”选项。",
        "p-l2": "clipboardWrite: 用于将清洗干净的链接回写至系统剪贴板。",
        "p-l3": "特定主站域名匹配: 用于在被支持的网站上安全注入对应的复制按钮。",
        "back-home": "返回首页",
        "meta-description": "轻量级、保护隐私的浏览器扩展。自动剥离追踪参数，并为 X、Bilibili、Reddit 和 Pixiv 生成完美兼容 Discord/Telegram 的卡片预览链接。"
    },
    en: {
        "language-label": "Language",
        "nav-features": "Features",
        "nav-platforms": "Supported Sites",
        "hero-title": "Share Cleaner, Safer Links Instantly",
        "hero-subtitle": "A lightweight, privacy-focused web extension. Automatically strip tracking parameters and generate gorgeous, embed-friendly previews for X, Bilibili, Reddit, and Pixiv.",
        "store-chrome-small": "Source & install",
        "store-firefox-small": "Source & install",
        "store-safari-small": "Source & install",
        "store-zip-small": "Developer Mode",
        "btn-chrome": "Chrome build notes",
        "btn-firefox": "Firefox build notes",
        "btn-safari": "Safari build notes",
        "btn-zip": "Download releases",
        "preview-original": "Original Link:",
        "preview-arrow": "⬇️ Strips trackers & rewrites host",
        "preview-vx": "Cleaned VX Link:",
        "url-original": "https://x.com/user/status/1234567890?s=20&t=tracker_code_abc",
        "url-vx": "https://vxtwitter.com/user/status/1234567890",
        "features-title": "Why Use VX Link Helper?",
        "feat1-title": "🔒 100% Local Processing",
        "feat1-desc": "Runs completely inside your browser sandbox. No telemetry, no backend analysis, and absolute offline privacy with data that belongs entirely to you.",
        "feat2-title": "✨ Flawless Preview Cards",
        "feat2-desc": "Converts regular URLs to optimized preview proxies like vxtwitter, ensuring media embeds render perfectly inside messaging clients like Discord and Telegram.",
        "feat3-title": "⚡ Native UI Injection",
        "feat3-desc": "Uses fast DOM observers to inject a sleek VX shortcut next to each supported site's original share controls.",
        "platforms-title": "Supported Domain Transformations",
        "table-th1": "Platform",
        "table-th2": "Original Domain",
        "table-th3": "Privacy / Embed Domain",
        "footer-docs": "Project notes",
        "footer-text": "VX Link Helper is fully open-source, local-only, and tracking-free.",
        "footer-privacy": "Privacy Policy",
        "p-title": "Privacy Policy",
        "p-intro": "VX Link Helper was built with user privacy as its core principle. This policy documents the local-only behavior of the extension:",
        "p-h1": "1. Zero Data Collection",
        "p-d1": "We <b>do not collect, store, transmit, or sell</b> any personal data, clipboard values, browsing history, or usage logs. There is no telemetry pipeline and no remote analytics service.",
        "p-h2": "2. Local-Only Processing",
        "p-d2": "All link cleanup and domain rewriting runs inside your browser sandbox on your own device. URLs are processed locally and remain under your control.",
        "p-h3": "3. Permission Transparency",
        "p-d3": "Requested browser permissions are limited to the features they enable:",
        "p-l1": "contextMenus: Adds the Copy VX Link action to the browser context menu.",
        "p-l2": "clipboardWrite: Writes the cleaned link back to your system clipboard.",
        "p-l3": "Specific host matches: Safely injects copy buttons only on supported websites.",
        "back-home": "Back to Home",
        "meta-description": "A lightweight, privacy-focused extension that strips tracking parameters and generates embed-friendly links for X, Bilibili, Reddit, and Pixiv."
    }
};

const supportedLanguages = new Set(Object.keys(i18nData));
let currentLang = "en";

function normalizeLanguage(lang) {
    if (!lang) return "en";
    const normalized = lang.toLowerCase();
    return normalized.startsWith("zh") ? "zh" : "en";
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
}

function setHtml(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.innerHTML = value;
}

function setPreviewLink(id, value) {
    const el = document.getElementById(id);
    if (!el || !value) return;
    el.textContent = value;
    if (el.tagName === "A") el.href = value;
}

function applyTranslations() {
    const data = i18nData[currentLang] || i18nData.en;
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
    });

    ["btn-chrome", "btn-firefox", "btn-safari", "btn-zip", "back-home", "p-title", "p-h1", "p-h2", "p-d2", "p-h3", "p-d3", "p-l1", "p-l2", "p-l3"].forEach(id => setText(id, data[id]));
    ["p-intro", "p-d1"].forEach(id => setHtml(id, data[id]));
    setPreviewLink("url-original", data["url-original"]);
    setPreviewLink("url-vx", data["url-vx"]);

    const selectEl = document.getElementById("lang-select");
    if (selectEl) selectEl.value = currentLang;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && data["meta-description"]) {
        metaDescription.setAttribute("content", data["meta-description"]);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("vxlh-lang");
    currentLang = supportedLanguages.has(savedLang) ? savedLang : normalizeLanguage(navigator.language || navigator.userLanguage);
    applyTranslations();

    const selectEl = document.getElementById("lang-select");
    if (selectEl) {
        selectEl.addEventListener("change", (e) => {
            currentLang = supportedLanguages.has(e.target.value) ? e.target.value : "en";
            localStorage.setItem("vxlh-lang", currentLang);
            applyTranslations();
        });
    }
});
