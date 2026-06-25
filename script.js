// 多语言字典配置（包含文本和示例链接）
const i18nData = {
    zh: {
        // 导航
        "nav-features": "功能特点",
        "nav-platforms": "支持平台",
        "nav-download": "获取扩展",
        // 主视觉
        "hero-title": "分享更干净、更安全的链接",
        "hero-subtitle": "轻量级、保护隐私的浏览器扩展。自动剥离各类隐藏追踪参数，并为 X、Bilibili、Reddit 和 Pixiv 生成对社交软件更友好的卡片预览链接。",
        // 下载按钮
        "btn-chrome": "Chrome 商店下载",
        "btn-firefox": "Firefox 商店下载",
        "btn-safari": "Safari 商店下载",
        "btn-zip": "下载独立离线包",
        // 预览框 (中文展示 B 站示例)
        "preview-original": "原始链接:",
        "preview-arrow": "⬇️ 自动净化参数并重写域名",
        "preview-vx": "VX 净化链接:",
        "url-original": "https://www.bilibili.com/video/BV1xx411c7xx/?spm_id_from=333.788&share_source=copy_web&vd_source=123456",
        "url-vx": "https://vxbilibili.com/video/BV1xx411c7xx/",
        // 特性
        "features-title": "为什么选择 VX Link Helper？",
        "feat1-title": "🔒 纯本地保护",
        "feat1-desc": "100% 运行在浏览器本地，不向外发起任何网络请求。在复制的瞬间剥离隐藏在链接内部的用户行为追踪令牌。",
        "feat2-title": "✨ 完美卡片渲染",
        "feat2-desc": "自动将支持的网站域名转换为兼容的预览代理（如 vxtwitter），确保在 Discord、Telegram 等聊天软件中直接展现完整的媒体卡片。",
        "feat3-title": "⚡ 原生级内嵌",
        "feat3-desc": "利用高效的 DOM 监听，无感地在目标网站原生分享按钮旁注入快捷的“VX”一键复制按钮，极速流畅。",
        // 表格
        "platforms-title": "已支持的域名转换",
        "table-th1": "平台",
        "table-th2": "原始域名",
        "table-th3": "转换后防追踪/卡片域名",
        // 页脚
        "footer-text": "VX Link Helper 承诺完全开源、本地运行且无任何潜在数据追踪。",
        "footer-privacy": "隐私政策"
    },
    en: {
        "nav-features": "Features",
        "nav-platforms": "Supported Sites",
        "nav-download": "Download",
        "hero-title": "Share Cleaner, Safer Links Instantly",
        "hero-subtitle": "A lightweight, privacy-focused web extension. Automatically strip tracking parameters and generate gorgeous, embed-friendly previews for X, Bilibili, Reddit, and Pixiv.",
        "btn-chrome": "Chrome Web Store",
        "btn-firefox": "Firefox Add-ons",
        "btn-safari": "Safari App Store",
        "btn-zip": "Download Standalone .ZIP",
        // 预览框 (英文展示 X 示例)
        "preview-original": "Original Link:",
        "preview-arrow": "⬇️ Strips Trackers & Rewrites Host",
        "preview-vx": "Cleaned VX Link:",
        "url-original": "https://x.com/user/status/1234567890?s=20&t=tracker_code_abc",
        "url-vx": "https://vxtwitter.com/user/status/1234567890",
        
        "features-title": "Why Use VX Link Helper?",
        "feat1-title": "🔒 100% Local Processing",
        "feat1-desc": "Runs completely inside your browser sandbox. No telemetry, no backend analysis, and absolute offline privacy with data that belongs entirely to you.",
        "feat2-title": "✨ Flawless Preview Cards",
        "feat2-desc": "Converts regular URLs to optimized preview proxies (like vxtwitter), ensuring media embeds render perfectly inside messaging clients like Discord and Telegram.",
        "feat3-title": "⚡ Native UI Injection",
        "feat3-desc": "Utilizes ultra-fast DOM observers to seamlessly inject a sleek 'VX' action shortcut right next to the original site sharing triggers.",
        "platforms-title": "Supported Domain Transformations",
        "table-th1": "Platform",
        "table-th2": "Original Domain",
        "table-th3": "Privacy / Embed Domain",
        "footer-text": "VX Link Helper is fully open-source, local-only, and tracking-free.",
        "footer-privacy": "Privacy Policy"
    }
};

// 状态管理
let currentLang = "en"; // 默认占位，稍后由系统判定覆盖

function applyTranslations() {
    const data = i18nData[currentLang];

    // 1. 批量替换普通文本 (通过 data-i18n 属性)
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
    });

    // 2. 替换按钮文本 (通过 ID 提取，避免层级冲突)
    const buttonIds = ['btn-chrome', 'btn-firefox', 'btn-safari', 'btn-zip'];
    buttonIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && data[id]) el.textContent = data[id];
    });

    // 3. 替换动态预览链接配置
    const originalUrlEl = document.getElementById("url-original");
    const vxUrlEl = document.getElementById("url-vx");
    if (originalUrlEl) originalUrlEl.textContent = data["url-original"];
    if (vxUrlEl) vxUrlEl.textContent = data["url-vx"];

    // 4. 更新下拉框的状态，确保 UI 与当前状态一致
    const selectEl = document.getElementById("lang-select");
    if (selectEl) selectEl.value = currentLang;
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    // 自动检测用户系统/浏览器语言偏好
    const systemLang = navigator.language || navigator.userLanguage;
    currentLang = systemLang.startsWith("zh") ? "zh" : "en";
    
    applyTranslations();

    // 绑定下拉菜单切换事件
    const selectEl = document.getElementById("lang-select");
    if (selectEl) {
        selectEl.addEventListener("change", (e) => {
            currentLang = e.target.value;
            applyTranslations();
        });
    }
});