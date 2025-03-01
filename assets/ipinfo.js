document.addEventListener("DOMContentLoaded", function () {
    // Get Browser Info
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Chrome")) return "Google Chrome";
        if (userAgent.includes("Firefox")) return "Mozilla Firefox";
        if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
        if (userAgent.includes("Edge")) return "Microsoft Edge";
        if (userAgent.includes("MSIE") || userAgent.includes("Trident")) return "Internet Explorer";
        return "Unknown";
    }

    // Get OS Info
    function getOSInfo() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Windows")) return "Windows";
        if (userAgent.includes("Mac")) return "macOS";
        if (userAgent.includes("Linux")) return "Linux";
        if (userAgent.includes("Android")) return "Android";
        if (userAgent.includes("iOS") || userAgent.includes("iPhone")) return "iOS";
        return "Unknown";
    }

    // Get Device Type
    function getDeviceType() {
        return /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
    }

    // Get Screen Resolution
    function getScreenResolution() {
        return `${window.screen.width} x ${window.screen.height}`;
    }

    // Fetch IP Address from ipify (More Reliable)
    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("ip").textContent = data.ip;
        })
        .catch(error => {
            console.error("IP Fetch Error:", error);
            document.getElementById("ip").textContent = "Error fetching IP";
        });

    // Fetch Additional Info from ipinfo.io (More Reliable)
    fetch("https://ipinfo.io/json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("location").textContent = `${data.city}, ${data.region}, ${data.country}`;
            document.getElementById("isp").textContent = data.org || "Unknown ISP";
            document.getElementById("timezone").textContent = data.timezone;
            document.getElementById("latlong").textContent = data.loc || "Unavailable";
        })
        .catch(error => {
            console.error("Location Fetch Error:", error);
            document.getElementById("location").textContent = "Error fetching location";
            document.getElementById("isp").textContent = "Unknown";
            document.getElementById("timezone").textContent = "Unknown";
            document.getElementById("latlong").textContent = "Unavailable";
        });

    // Set Browser, OS, and Device Info
    document.getElementById("browser").textContent = getBrowserInfo();
    document.getElementById("os").textContent = getOSInfo();
    document.getElementById("device").textContent = getDeviceType();
    document.getElementById("screen").textContent = getScreenResolution();
});
