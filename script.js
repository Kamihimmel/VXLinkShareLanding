// 多语言字典配置
const i18nData = {
    zh: {
        // 导航
        "nav-features": "功能特点",
        "nav-platforms": "支持平台",
        "nav-download": "获取扩展",
        // 主视觉
        "hero-title": "分享更干净、更安全的链接",
        "hero-subtitle": "轻量级、保护隐私的浏览器扩展。自动剥离各类隐藏追踪参数，并为 X、Bilibili、Reddit 和 Pixiv 生成对社交软件更友好的卡片预览链接。",
        // 下载按钮内部标签描述（保持英文习惯）
        "chrome-lbl": "Chrome 商店下载",
        "firefox-lbl": "Firefox 商店下载",
        "safari-lbl": "Safari 商店下载",
        "zip-lbl": "下载独立离线包",
        // 预览框
        "preview-original": "原始链接:",
        "preview-arrow": "⬇️ 自动净化参数并重写域名",
        "preview-vx": "VX 净化链接:",
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
        "footer-privacy": "隐私政策",
        
        // 隐私页专用额外映射
        "p-title": "隐私政策",
        "p-intro": "VX Link Helper 扩展程序在开发设计上将用户的“绝对隐私”放在首位。本政策阐明了本扩展不涉及任何用户数据的处理逻辑：",
        "p-h1": "1. 零数据收集",
        "p-d1": "我们<b>不会收集、存储、上传、传输或销售</b>您的任何个人信息、浏览历史或剪贴板内容。扩展程序没有后台统计、没有行为分析脚本，更没有设立任何远程服务器。",
        "p-h2": "2. 本地化运行架构",
        "p-d2": "所有的链接参数剥离和重写操作（如过滤 bilibili 追踪代码、重定向 Reddit 链接）全部由您本地设备的浏览器底层沙盒隔离执行，数据完全属于您自己。",
        "p-h3": "3. 权限合规说明",
        "p-d3": "本扩展申请的专用权限仅为实现对应原生功能，绝无滥用：",
        "p-l1": "contextMenus: 用于在右键菜单中生成“复制 VX 链接”选项。",
        "p-l2": "clipboardWrite: 用于将清洗干净的链接回写至系统剪贴板。",
        "p-l3": "特定主站域名匹配: 用于在被支持的网站上安全注入对应的物理复制按钮。",
        "back-home": "返回首页"
    },
    en: {
        "nav-features": "Features",
        "nav-platforms": "Supported Sites",
        "nav-download": "Download",
        "hero-title": "Share Cleaner, Safer Links Instantly",
        "hero-subtitle": "A lightweight, privacy-focused web extension. Automatically strip tracking parameters and generate gorgeous, embed-friendly previews for X, Bilibili, Reddit, and Pixiv.",
        "chrome-lbl": "Chrome Web Store",
        "firefox-lbl": "Firefox Add-ons",
        "safari-lbl": "Safari Mac App Store",
        "zip-lbl": "Download Standalone .ZIP",
        "preview-original": "Original Link:",
        "preview-arrow": "⬇️ Strips Trackers & Rewrites Host",
        "preview-vx": "Cleaned VX Link:",
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
        "footer-privacy": "Privacy Policy",
        
        "p-title": "Privacy Policy",
        "p-intro": "VX Link Helper ('the Extension') was built with user privacy as its core principle. This policy explicitly documents that no user tracking takes place:",
        "p-h1": "1. Zero Data Collection",
        "p-d1": "We <b>do not collect, store, transmit, or sell</b> any of your personal data, clipboard values, or browser logs. No tracking nodes or external services are used.",
        "p-h2": "2. Standalone Operations",
        "p-d2": "All string formatting, tracking identification adjustments, and domain swaps occur contextually on your architecture using isolated JavaScript algorithms.",
        "p-h3": "3. Permissions Transparency",
        "p-d3": "The specialized security permissions are configured strictly for fundamental components:",
        "p-l1": "contextMenus: Adds 'Copy VX Link' option when right-clicking active elements.",
        "p-l2": "clipboardWrite: Allows returning processed strings directly back to your clipboard logs.",
        "p-l3": "Host Queries: Matches active URLs to inject buttons on approved platforms.",
        "back-home": "Back to Home"
    }
};

let currentLang = "zh";

function applyTranslations() {
    // 1. 遍历带有 data-i18n 属性的节点
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18nData[currentLang][key]) {
            el.textContent = i18nData[currentLang][key];
        }
    });

    // 2. 针对下载按钮内部的中文文本进行特异替换
    const storeButtons = document.querySelectorAll(".btn-text span");
    if (storeButtons.length === 4) {
        storeButtons[0].textContent = i18nData[currentLang]["chrome-lbl"];
        storeButtons[1].textContent = i18nData[currentLang]["firefox-lbl"];
        storeButtons[2].textContent = i18nData[currentLang]["safari-lbl"];
        storeButtons[3].textContent = i18nData[currentLang]["zip-lbl"];
    }

    // 3. 针对隐私页(如有)由于结构特殊直接元素替换
    const backHome = document.getElementById("back-home");
    if (backHome) backHome.textContent = i18nData[currentLang]["back-home"];
    const pTitle = document.getElementById("p-title");
    if (pTitle) pTitle.textContent = i18nData[currentLang]["p-title"];
    const pIntro = document.getElementById("p-intro");
    if (pIntro) pIntro.innerHTML = i18nData[currentLang]["p-intro"];
    const pH1 = document.getElementById("p-h1");
    if (pH1) pH1.textContent = i18nData[currentLang]["p-h1"];
    const pD1 = document.getElementById("p-d1");
    if (pD1) pD1.innerHTML = i18nData[currentLang]["p-d1"];
    const pH2 = document.getElementById("p-h2");
    if (pH2) pH2.textContent = i18nData[currentLang]["p-h2"];
    const pD2 = document.getElementById("p-d2");
    if (pD2) pD2.textContent = i18nData[currentLang]["p-d2"];
    const pH3 = document.getElementById("p-h3");
    if (pH3) pH3.textContent = i18nData[currentLang]["p-h3"];
    const pD3 = document.getElementById("p-d3");
    if (pD3) pD3.textContent = i18nData[currentLang]["p-d3"];
    const pL1 = document.getElementById("p-l1");
    if (pL1) pL1.textContent = i18nData[currentLang]["p-l1"];
    const pL2 = document.getElementById("p-l2");
    if (pL2) pL2.textContent = i18nData[currentLang]["p-l2"];
    const pL3 = document.getElementById("p-l3");
    if (pL3) pL3.textContent = i18nData[currentLang]["p-l3"];

    // 切换按钮自身文本提示
    document.getElementById("lang-toggle").textContent = currentLang === "zh" ? "English" : "中文";
}

document.addEventListener("DOMContentLoaded", () => {
    // 自动检测用户系统/浏览器语言偏好
    const systemLang = navigator.language || navigator.userLanguage;
    currentLang = systemLang.startsWith("zh") ? "zh" : "en";
    applyTranslations();

    // 绑定切换事件
    document.getElementById("lang-toggle").addEventListener("click", () => {
        currentLang = currentLang === "zh" ? "en" : "zh";
        applyTranslations();
    });
});