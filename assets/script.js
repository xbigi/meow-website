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
    
    // 📝 Typing Effect for Welcome Text
    document.addEventListener('DOMContentLoaded', function () {
        var options = {
            strings: ['Welcome to xbigi.xyz'],
            typeSpeed: 50,
            showCursor: true,
            cursorChar: '|',
            loop: false
        };
    
        new Typed('#welcome-text', options);
    
        // Make the cursor blink indefinitely
        setInterval(() => {
            document.querySelector('.typed-cursor').classList.toggle('hidden');
        }, 500);
    });
    

    // 🖱️ Custom Cursor Effect
    document.addEventListener('DOMContentLoaded', function () {
        const cursor = document.getElementById('custom-cursor');
    
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });
