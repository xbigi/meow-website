// 🌠 STAR BACKGROUND ANIMATION
const canvas = document.getElementById("stars");
if (canvas) {
    const ctx = canvas.getContext("2d");

    let stars = [];
    const numStars = 100;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5;
            this.alpha = Math.random();
            this.speed = Math.random() * 0.5 + 0.1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            this.alpha = Math.random();
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }

    initStars();
    animateStars();
}

// 🎮 FPS COUNTER (Only if FPS element exists)
const fpsCounter = document.getElementById("fps-counter");
if (fpsCounter) {
    let lastFrameTime = performance.now();
    let fps = 0;

    function updateFPS() {
        const now = performance.now();
        const delta = now - lastFrameTime;
        fps = Math.round(1000 / delta);
        lastFrameTime = now;

        if (fps > 0) {
            fpsCounter.textContent = `FPS: ${fps}`;
        }

        requestAnimationFrame(updateFPS);
    }

    updateFPS();
}


// 🌍 VISITOR COUNTER (Only if Visit Counter Exists)
const visitCounter = document.getElementById("visit-counter");

if (visitCounter) {
    fetch('https://api.api-ninjas.com/v1/counter?id=xbigi_visits&hit=true', {
        method: "GET",
        headers: {
            "X-Api-Key": "OVBCUnVES3uSHq3VTyVRMQ==IUbTTPf4HKP8vaVP"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        visitCounter.textContent = `Visitors: ${data.value}`;
    })
    .catch(error => {
        console.error("Error fetching visitor count:", error);
        visitCounter.textContent = "Visitors: Error";
    });
}

