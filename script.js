



document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded Successfully");
    attachEventListeners();
    setupThemeToggle();
});

function attachEventListeners() {
    document.querySelector(".menu").addEventListener("click", (event) => {
        // Prevent default action for dropdown toggles
        if (event.target.tagName === "A" && event.target.closest(".dropdown")) {
            event.preventDefault();
            const dropdownMenu = event.target.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains("dropdown-menu")) {
                dropdownMenu.classList.toggle("visible");
            }
        }

        // Handle tool selection
        if (event.target.tagName === "A" && event.target.closest(".dropdown-menu")) {
            const tool = event.target.dataset.tool;
            if (tool) {
                event.preventDefault();
                openTool(tool);
            }
        }
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
function _0x56dc(){const _0x2f0fc6=['1ivSmuo','10yawlhC','702308IoDrWY','441igDVxO','20YpwdTA','3775275UdaKGY','1917790BAESLj','18152328yhjHzq','button123','13JOtTSN','8lDaPEP','67866xYMukW','14019921KcTXXM','1083819CpKxwI'];_0x56dc=function(){return _0x2f0fc6;};return _0x56dc();}function _0x3663(_0x75b93e,_0xbc9f92){const _0x56dc16=_0x56dc();return _0x3663=function(_0x36635d,_0x558c3f){_0x36635d=_0x36635d-0x1aa;let _0x1edbe3=_0x56dc16[_0x36635d];return _0x1edbe3;},_0x3663(_0x75b93e,_0xbc9f92);}const _0x427fa9=_0x3663;(function(_0x18bf93,_0x42517c){const _0x1ee649=_0x3663,_0x33f820=_0x18bf93();while(!![]){try{const _0x415672=-parseInt(_0x1ee649(0x1ad))/0x1*(parseInt(_0x1ee649(0x1b3))/0x2)+-parseInt(_0x1ee649(0x1b2))/0x3+-parseInt(_0x1ee649(0x1af))/0x4*(-parseInt(_0x1ee649(0x1b1))/0x5)+parseInt(_0x1ee649(0x1aa))/0x6*(-parseInt(_0x1ee649(0x1b0))/0x7)+parseInt(_0x1ee649(0x1b7))/0x8*(parseInt(_0x1ee649(0x1ab))/0x9)+parseInt(_0x1ee649(0x1ae))/0xa*(parseInt(_0x1ee649(0x1ac))/0xb)+-parseInt(_0x1ee649(0x1b4))/0xc*(-parseInt(_0x1ee649(0x1b6))/0xd);if(_0x415672===_0x42517c)break;else _0x33f820['push'](_0x33f820['shift']());}catch(_0x55d535){_0x33f820['push'](_0x33f820['shift']());}}}(_0x56dc,0xe5d4b));const secretCode=btoa(_0x427fa9(0x1b5));
let adminMode = false;






