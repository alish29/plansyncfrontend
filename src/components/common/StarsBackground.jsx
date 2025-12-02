import React, { useEffect } from "react";

export default function StarsBackground() {
  useEffect(() => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);

      stars.forEach((star) => {
        star.alpha += star.speed;
        const opacity = Math.abs(Math.sin(star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      id="starfield"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
