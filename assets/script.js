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
let lastFrameTime = performance.now();
let fps = 0;

function updateFPS() {
    const now = performance.now();
    fps = Math.round(1000 / (now - lastFrameTime));
    lastFrameTime = now;
    document.getElementById("fps-counter").textContent = `FPS: ${fps}`;
    requestAnimationFrame(updateFPS);
}

updateFPS();
fetch('https://api.countapi.xyz/hit/xbigi.xyz/visits')
  .then(response => response.json())
  .then(data => {
      document.getElementById("visit-counter").textContent = `Visitors: ${data.value}`;
  })
  .catch(error => console.error('Error fetching visitor count:', error));
