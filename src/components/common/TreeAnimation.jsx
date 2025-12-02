import { useEffect, useRef } from 'react';

const TreeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const trees = [];
    const particles = [];
    const numTrees = 15;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -Math.random() * 0.3 - 0.1;
        this.size = Math.random() * 2 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vy += 0.01; // gravity
      }

      draw(ctx, isDark) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = isDark ? '#16a34a' : '#22c55e';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Tree {
      constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.branches = [];
        this.leaves = [];
        this.windOffset = Math.random() * Math.PI * 2;
        this.windSpeed = 0.2 + Math.random() * 0.3;
        this.createBranches();
        this.createLeaves();
      }

      createBranches() {
        const branchCount = 4 + Math.floor(Math.random() * 5);
        for (let i = 0; i < branchCount; i++) {
          const angle = (Math.PI / branchCount) * i - Math.PI / 2 + (Math.random() - 0.5) * 0.3;
          const length = this.height * (0.25 + Math.random() * 0.35);
          this.branches.push({
            angle,
            length,
            x: this.x,
            y: this.y + this.height * (0.2 + Math.random() * 0.2),
            subBranches: Math.floor(Math.random() * 3),
          });
        }
      }

      createLeaves() {
        const leafCount = 40 + Math.floor(Math.random() * 50);
        for (let i = 0; i < leafCount; i++) {
          this.leaves.push({
            x: this.x + (Math.random() - 0.5) * this.width * 1.5,
            y: this.y + Math.random() * this.height * 0.8,
            size: 4 + Math.random() * 5,
            opacity: 0.5 + Math.random() * 0.4,
            sway: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.2,
          });
        }
      }

      draw(ctx, time, isDark) {
        const wind = Math.sin(time * this.windSpeed + this.windOffset) * 3;
        const trunkColor = isDark ? '#1a1a1a' : '#2d5016';
        const branchColor = isDark ? '#2a2a2a' : '#3d6b1f';
        const leafColor = isDark ? '#16a34a' : '#22c55e';
        const brightLeafColor = isDark ? '#22c55e' : '#4ade80';

        // Trunk with gradient
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(wind * 0.015);
        
        const trunkGradient = ctx.createLinearGradient(-this.width / 6, 0, this.width / 6, this.height);
        trunkGradient.addColorStop(0, trunkColor);
        trunkGradient.addColorStop(1, isDark ? '#0f0f0f' : '#1a3d0a');
        ctx.fillStyle = trunkGradient;
        ctx.fillRect(-this.width / 6, 0, this.width / 3, this.height);
        ctx.restore();

        // Branches with sub-branches
        ctx.strokeStyle = branchColor;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        this.branches.forEach((branch) => {
          ctx.save();
          ctx.translate(branch.x, branch.y);
          ctx.rotate(branch.angle + wind * 0.015);
          
          // Main branch
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -branch.length);
          ctx.stroke();

          // Sub-branches
          for (let i = 0; i < branch.subBranches; i++) {
            const subY = -branch.length * (0.3 + i * 0.3);
            const subAngle = (Math.random() - 0.5) * 0.8;
            const subLength = branch.length * (0.2 + Math.random() * 0.2);
            ctx.save();
            ctx.translate(0, subY);
            ctx.rotate(subAngle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -subLength);
            ctx.stroke();
            ctx.restore();
          }
          
          ctx.restore();
        });

        // Leaves with better distribution
        this.leaves.forEach((leaf, index) => {
          const leafWind = Math.sin(time * leaf.speed + leaf.sway) * 4;
          const leafSway = Math.cos(time * leaf.speed * 0.7 + leaf.sway) * 2;
          ctx.save();
          ctx.translate(leaf.x + leafWind, leaf.y + leafSway);
          ctx.rotate(leafWind * 0.1);
          ctx.globalAlpha = leaf.opacity;
          
          // Leaf shape (oval)
          const leafGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, leaf.size);
          leafGradient.addColorStop(0, brightLeafColor);
          leafGradient.addColorStop(1, leafColor);
          ctx.fillStyle = leafGradient;
          
          ctx.beginPath();
          ctx.ellipse(0, 0, leaf.size, leaf.size * 0.7, leafWind * 0.1, 0, Math.PI * 2);
          ctx.fill();
          
          // Add some sparkle to random leaves
          if (index % 7 === 0 && Math.sin(time * 2 + index) > 0.8) {
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(leaf.size * 0.3, -leaf.size * 0.3, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        });
      }
    }

    // Create trees with better distribution
    for (let i = 0; i < numTrees; i++) {
      const x = (canvas.width / (numTrees + 1)) * (i + 1) + (Math.random() - 0.5) * 50;
      const y = canvas.height;
      const height = 180 + Math.random() * 150;
      const width = 25 + Math.random() * 20;
      trees.push(new Tree(x, y, height, width));
    }

    let time = 0;
    const animate = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      // Clear with fade effect
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(240, 253, 244, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.015;

      // Draw trees
      trees.forEach((tree) => {
        tree.draw(ctx, time, isDark);
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx, isDark);
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Add new particles from trees occasionally
      if (Math.random() < 0.1) {
        const randomTree = trees[Math.floor(Math.random() * trees.length)];
        particles.push(new Particle(
          randomTree.x + (Math.random() - 0.5) * randomTree.width,
          randomTree.y - randomTree.height * (0.3 + Math.random() * 0.4)
        ));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'multiply',
        opacity: 0.6
      }}
    />
  );
};

export default TreeAnimation;
