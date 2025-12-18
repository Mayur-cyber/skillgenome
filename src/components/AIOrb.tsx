import { useEffect, useRef } from "react";

interface AIOrbProps {
  isActive?: boolean;
  isThinking?: boolean;
}

const AIOrb = ({ isActive = true, isThinking = false }: AIOrbProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, size, size);

      // Outer glow layers
      for (let i = 5; i > 0; i--) {
        const radius = 60 + i * 10 + Math.sin(time * 2 + i) * 5;
        const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
        
        const alpha = (0.1 - i * 0.015) * (isActive ? 1 : 0.3);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(138, 43, 226, ${alpha * 0.5})`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Waveform ring
      const waveCount = isThinking ? 24 : 16;
      const baseRadius = 50;
      
      ctx.beginPath();
      for (let i = 0; i <= waveCount * 4; i++) {
        const angle = (i / (waveCount * 4)) * Math.PI * 2;
        const waveAmplitude = isThinking ? 15 : 8;
        const wave = Math.sin(angle * waveCount + time * 4) * waveAmplitude;
        const radius = baseRadius + wave;
        
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const waveGradient = ctx.createLinearGradient(0, 0, size, size);
      waveGradient.addColorStop(0, "#00F0FF");
      waveGradient.addColorStop(0.5, "#8A2BE2");
      waveGradient.addColorStop(1, "#00F0FF");

      ctx.strokeStyle = waveGradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner core
      const coreGradient = ctx.createRadialGradient(center, center, 0, center, center, 35);
      coreGradient.addColorStop(0, "rgba(0, 240, 255, 0.8)");
      coreGradient.addColorStop(0.5, "rgba(138, 43, 226, 0.4)");
      coreGradient.addColorStop(1, "rgba(0, 240, 255, 0.1)");

      ctx.beginPath();
      ctx.fillStyle = coreGradient;
      ctx.arc(center, center, 35, 0, Math.PI * 2);
      ctx.fill();

      // Center bright spot
      const spotGradient = ctx.createRadialGradient(center, center, 0, center, center, 15);
      spotGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      spotGradient.addColorStop(0.5, "rgba(0, 240, 255, 0.5)");
      spotGradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = spotGradient;
      ctx.arc(center, center, 15, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting particles (when thinking)
      if (isThinking) {
        for (let i = 0; i < 6; i++) {
          const orbitAngle = time * 3 + (i * Math.PI * 2) / 6;
          const orbitRadius = 45;
          const px = center + Math.cos(orbitAngle) * orbitRadius;
          const py = center + Math.sin(orbitAngle) * orbitRadius;

          const particleGradient = ctx.createRadialGradient(px, py, 0, px, py, 6);
          particleGradient.addColorStop(0, "#00F0FF");
          particleGradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = particleGradient;
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive, isThinking]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-[200px] h-[200px]"
        style={{
          filter: isActive ? "drop-shadow(0 0 30px rgba(0, 240, 255, 0.3))" : "none",
        }}
      />
      {isThinking && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <span className="font-mono text-xs text-primary animate-pulse">
            ANALYZING...
          </span>
        </div>
      )}
    </div>
  );
};

export default AIOrb;
