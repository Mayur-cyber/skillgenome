import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SkillScore {
  name: string;
  score: number;
  category: string;
}

interface SkillScoreListProps {
  skills: SkillScore[];
}

const SkillScoreList = ({ skills }: SkillScoreListProps) => {
  const [animatedScores, setAnimatedScores] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedScores(skills.map(skill => Math.round(skill.score * eased)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [skills]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-secondary";
    return "text-destructive";
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return "from-accent to-accent/50";
    if (score >= 60) return "from-primary to-secondary";
    if (score >= 40) return "from-secondary to-secondary/50";
    return "from-destructive to-destructive/50";
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Skill Scores</h3>
          <p className="text-xs text-muted-foreground font-mono">DETAILED BREAKDOWN</p>
        </div>
      </div>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted/50">
                  {skill.category}
                </span>
              </div>
              <span className={cn("font-mono text-sm font-semibold", getScoreColor(skill.score))}>
                {animatedScores[index]}%
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
                  getBarColor(skill.score)
                )}
                style={{ width: `${animatedScores[index]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillScoreList;
