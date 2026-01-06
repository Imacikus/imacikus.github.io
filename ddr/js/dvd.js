document.addEventListener("DOMContentLoaded", () => {
  const dvd = document.getElementById("dvd");
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let x = 50, y = 50;
  let vx = 3, vy = 3;
  let lastCorner = false;
  let particles = [];

  function spawnConfetti(cx, cy) {
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -6,
        size: Math.random() * 6 + 3,
        life: 100,
        color: ["#ff0000", "#ffff00", "#00ff00", "#ffffff"][Math.floor(Math.random() * 4)]
      });
    }
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    particles = particles.filter(p => p.life > 0);
  }

  function loop() {
    x += vx;
    y += vy;

    if (x <= 0 || x + dvd.offsetWidth >= innerWidth) vx *= -1;
    if (y <= 0 || y + dvd.offsetHeight >= innerHeight) vy *= -1;

    dvd.style.left = x + "px";
    dvd.style.top = y + "px";

    const corner =
      (x <= 0 && y <= 0) ||
      (x + dvd.offsetWidth >= innerWidth && y <= 0) ||
      (x <= 0 && y + dvd.offsetHeight >= innerHeight) ||
      (x + dvd.offsetWidth >= innerWidth && y + dvd.offsetHeight >= innerHeight);

    if (corner && !lastCorner) {
      spawnConfetti(
        x + dvd.offsetWidth / 2,
        y + dvd.offsetHeight / 2
      );
      console.log("☭ ECKE ERREICHT ☭");
    }

    lastCorner = corner;
    updateConfetti();
    requestAnimationFrame(loop);
  }

  loop();
});
