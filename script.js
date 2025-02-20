



document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded Successfully");
    attachEventListeners();
    setupThemeToggle();
});

function attachEventListeners() {
    // Toggle dropdown visibility when clicking on the menu items
    document.querySelectorAll(".dropdown > a").forEach((dropdownToggle) => {
        dropdownToggle.addEventListener("click", (event) => {
            event.preventDefault();
            const dropdownMenu = dropdownToggle.nextElementSibling;
            if (dropdownMenu) {
                dropdownMenu.classList.toggle("visible");
            }
        });
    });

    // Handle tool selection
    document.querySelectorAll(".dropdown-menu a").forEach((toolButton) => {
        toolButton.addEventListener("click", (event) => {
            event.preventDefault();
            const tool = event.target.dataset.tool;
            if (tool) {
                openTool(tool);
            }
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown-menu").forEach((menu) => {
                menu.classList.remove("visible");
            });
        }
    });
}





function setupThemeToggle() {
    const themeToggle = document.createElement("button");
    themeToggle.innerHTML = "🌙";
    themeToggle.id = "theme-toggle";
    themeToggle.style.position = "fixed";
    themeToggle.style.top = "10px";
    themeToggle.style.right = "10px";
    themeToggle.style.fontSize = "24px";
    themeToggle.style.cursor = "pointer";
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.innerHTML = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
    });
}

function openTool(tool) {
    const toolContainer = document.getElementById("tool-container");
    toolContainer.style.opacity = "0";
    setTimeout(() => {
        toolContainer.innerHTML = ""; // Clear previous content

        switch (tool) {
            case "password":
                toolContainer.innerHTML = `<h2>Password Generator</h2>
                    <label><input type='checkbox' id='include-numbers'> Include Numbers</label>
                    <label><input type='checkbox' id='include-symbols'> Include Symbols</label>
                    <label><input type='checkbox' id='include-uppercase'> Include Uppercase</label>
                    <input type='number' id='password-length' placeholder='Length' min='4' max='32'>
                    <button id='generate-password'>Generate</button>
                    <p id='password-output'></p>`;
                document.getElementById("generate-password").addEventListener("click", generatePassword);
                break;
            case "qr":
                toolContainer.innerHTML = `<h2>QR Code Generator</h2>
                    <input type='text' id='qr-input' placeholder='Enter text/URL'>
                    <button id='generate-qr'>Generate</button>
                    <div id='qr-output'></div>`;
                document.getElementById("generate-qr").addEventListener("click", generateQR);
                break;
            case "stopwatch":
                toolContainer.innerHTML = `<h2>Stopwatch/Timer</h2>
                    <p id='stopwatch-display'>00:00:00.000</p>
                    <button id='start-stopwatch'>Start</button>
                    <button id='stop-stopwatch'>Stop</button>
                    <button id='reset-stopwatch'>Reset</button>`;
                document.getElementById("start-stopwatch").addEventListener("click", startStopwatch);
                document.getElementById("stop-stopwatch").addEventListener("click", stopStopwatch);
                document.getElementById("reset-stopwatch").addEventListener("click", resetStopwatch);
                break;
            case "wordcounter":
                toolContainer.innerHTML = `<h2>Word & Character Counter</h2>
                    <textarea id='text-input' rows='4' cols='50'></textarea>
                    <p id='word-count'>Words: 0 | Characters: 0</p>`;
                document.getElementById("text-input").addEventListener("input", updateWordCount);
                break;
            case "coinflip":
                toolContainer.innerHTML = `<h2>Coin Flip</h2>
                    <div id='coin' class='coin'></div>
                    <button id='flip-again'>Flip Again</button>`;
                const coin = document.getElementById("coin");
                coin.innerText = ""; // Initial blank state
                document.getElementById("flip-again").addEventListener("click", flipCoin);
                break;
            case "wall":
                setupWall(toolContainer);
                break;
            default:
                toolContainer.innerHTML = `<h2>Error</h2><p>Tool not found.</p>`;
        }
        toolContainer.style.opacity = "1";
    }, 300);
}







    




function generatePassword() {
    const length = parseInt(document.getElementById("password-length").value) || 12;
    const includeUppercase = document.getElementById("include-uppercase").checked;
    const includeNumbers = document.getElementById("include-numbers").checked;
    const includeSymbols = document.getElementById("include-symbols").checked;

    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~`";

    // Ensure inclusion of at least one character from each selected set
    let password = "";
    if (includeUppercase) password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    if (includeNumbers) password += "0123456789".charAt(Math.floor(Math.random() * 10));
    if (includeSymbols) password += "!@#$%^&*()_+{}[]|:;<>,.?/~`".charAt(Math.floor(Math.random() * 29));

    // Fill the rest of the password with random characters from the full charset
    for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle the password to prevent predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    document.getElementById("password-output").innerText = `Generated Password: ${password}`;
}

function flipCoin() {
    const coin = document.getElementById("coin");
    coin.innerText = ""; // Set blank before animation
    coin.style.animation = "flip 1s ease-in-out";
    setTimeout(() => {
        coin.style.animation = "none";
        coin.innerText = Math.random() < 0.5 ? "Heads" : "Tails";
    }, 1000);
}

function generateQR() {
    const input = document.getElementById("qr-input").value;
    const qrOutput = document.getElementById("qr-output");
    qrOutput.innerHTML = `<img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input)}' alt='QR Code'>`;
}

let stopwatchInterval, elapsedTime = 0;
function startStopwatch() {
    if (!stopwatchInterval) {
        const startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById("stopwatch-display").innerText = formatTime(elapsedTime);
        }, 10);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    document.getElementById("stopwatch-display").innerText = "00:00:00.000";
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = ms % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateWordCount() {
    const text = document.getElementById("text-input").value;
    const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    document.getElementById("word-count").innerText = `Words: ${words} | Characters: ${characters}`;
}







