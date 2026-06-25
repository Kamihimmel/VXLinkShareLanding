// Simple context checking to provide a localized/reactive user experience
document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("download-btn");
    const userAgent = navigator.userAgent.toLowerCase();

    // Dynamically contextualize the CTA download text matching user browser capabilities
    if (userAgent.includes("chrome") || userAgent.includes("chromium")) {
        downloadBtn.textContent = "Install Unpacked (Chrome)";
    } else if (userAgent.includes("firefox")) {
        downloadBtn.textContent = "Install Temporary Add-on (Firefox)";
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
        downloadBtn.textContent = "Configure Developer Mode (Safari)";
    } else {
        downloadBtn.textContent = "Get Extension Setup";
    }
});