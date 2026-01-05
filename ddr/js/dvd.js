document.addEventListener("DOMContentLoaded", function() {
  const dvd = document.getElementById("dvd");
  let x = 50;
  let y = 50;
  let vx = 3;
  let vy = 3;

  function loop() {
    x += vx;
    y += vy;

    if (x + dvd.offsetWidth >= window.innerWidth || x <= 0) vx *= -1;
    if (y + dvd.offsetHeight >= window.innerHeight || y <= 0) vy *= -1;

    dvd.style.left = x + "px";
    dvd.style.top = y + "px";

    requestAnimationFrame(loop);
  }

  loop();
});
