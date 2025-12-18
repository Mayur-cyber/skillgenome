import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  score: number;
  category: "technical" | "soft" | "domain";
}

interface SkillRadarChartProps {
  skills: Skill[];
  size?: number;
}

const SkillRadarChart = ({ skills, size = 400 }: SkillRadarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    // Animate in
    const duration = 1500;
    const startTime = Date.now();

    const animateIn = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animateIn);
      }
    };

    animateIn();
  }, [skills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const maxRadius = size * 0.38;
    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw concentric rings
    for (let i = 5; i > 0; i--) {
      const ringRadius = (maxRadius / 5) * i;
      ctx.beginPath();
      ctx.arc(center, center, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 + i * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ring labels
      if (i === 5) {
        ctx.font = "10px JetBrains Mono";
        ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
        ctx.fillText("100%", center + 4, center - ringRadius + 12);
      }
    }

    // Draw axis lines
    skills.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = center + Math.cos(angle) * maxRadius;
      const y = center + Math.sin(angle) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(138, 43, 226, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw skill polygon with animation
    ctx.beginPath();
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.score / 100) * maxRadius * animationProgress;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();

    // Gradient fill
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, maxRadius);
    gradient.addColorStop(0, "rgba(0, 240, 255, 0.4)");
    gradient.addColorStop(0.5, "rgba(138, 43, 226, 0.3)");
    gradient.addColorStop(1, "rgba(0, 240, 255, 0.1)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    const strokeGradient = ctx.createLinearGradient(0, 0, size, size);
    strokeGradient.addColorStop(0, "#00F0FF");
    strokeGradient.addColorStop(0.5, "#8A2BE2");
    strokeGradient.addColorStop(1, "#00F0FF");
    ctx.strokeStyle = strokeGradient;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw skill points and labels
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.score / 100) * maxRadius * animationProgress;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      // Point glow
      const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
      pointGradient.addColorStop(0, "#00F0FF");
      pointGradient.addColorStop(0.5, "rgba(0, 240, 255, 0.3)");
      pointGradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.fillStyle = pointGradient;
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Point core
      ctx.beginPath();
      ctx.fillStyle = "#00F0FF";
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      const labelRadius = maxRadius + 30;
      const labelX = center + Math.cos(angle) * labelRadius;
      const labelY = center + Math.sin(angle) * labelRadius;

      ctx.font = "12px Inter";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(skill.name, labelX, labelY);

      // Score below label
      ctx.font = "11px JetBrains Mono";
      ctx.fillStyle = "#00F0FF";
      ctx.fillText(`${Math.round(skill.score * animationProgress)}%`, labelX, labelY + 16);
    });

    // Center decoration
    const centerGradient = ctx.createRadialGradient(center, center, 0, center, center, 20);
    centerGradient.addColorStop(0, "rgba(138, 43, 226, 0.6)");
    centerGradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.fillStyle = centerGradient;
    ctx.arc(center, center, 20, 0, Math.PI * 2);
    ctx.fill();

  }, [skills, size, animationProgress]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]"
      />
      {/* DNA Helix decoration */}
      <div className="absolute inset-0 pointer-events-none animate-spin-slow opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="url(#helixGradient)" strokeWidth="0.5" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SkillRadarChart;
