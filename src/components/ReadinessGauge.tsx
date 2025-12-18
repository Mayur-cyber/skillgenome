import { useEffect, useState } from "react";

interface ReadinessGaugeProps {
  level: string;
  percentage: number;
}

const ReadinessGauge = ({ level, percentage }: ReadinessGaugeProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPercentage(Math.round(percentage * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [percentage]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl" />
        
        {/* SVG Gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
          />
          
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="#39FF14" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono gradient-text">
            {animatedPercentage}%
          </span>
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            Readiness
          </span>
        </div>

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick, i) => {
          const angle = (tick / 100) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * 95;
          const y = 100 + Math.sin(rad) * 95;
          return (
            <div
              key={tick}
              className="absolute w-1 h-1 rounded-full bg-muted-foreground/50"
              style={{
                left: `${(x / 200) * 100}%`,
                top: `${(y / 200) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* Level Badge */}
      <div className="glass-card px-6 py-3 text-center">
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider block mb-1">
          Current Level
        </span>
        <span className="text-lg font-semibold text-foreground">{level}</span>
      </div>
    </div>
  );
};

export default ReadinessGauge;
