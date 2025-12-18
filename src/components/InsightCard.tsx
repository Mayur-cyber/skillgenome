import { AlertTriangle, TrendingUp, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  type: "gap" | "strength" | "growth" | "recommendation";
  title: string;
  description: string;
}

interface InsightCardProps {
  insights: Insight[];
}

const iconMap = {
  gap: AlertTriangle,
  strength: Zap,
  growth: TrendingUp,
  recommendation: Target,
};

const colorMap = {
  gap: "text-destructive border-destructive/20 bg-destructive/5",
  strength: "text-accent border-accent/20 bg-accent/5",
  growth: "text-secondary border-secondary/20 bg-secondary/5",
  recommendation: "text-primary border-primary/20 bg-primary/5",
};

const labelMap = {
  gap: "Skill Gap",
  strength: "Strength",
  growth: "Growth Area",
  recommendation: "Recommendation",
};

const InsightCard = ({ insights }: InsightCardProps) => {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Genetic Analysis</h3>
          <p className="text-xs text-muted-foreground font-mono">DEEP PATTERN RECOGNITION</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type];
          return (
            <div
              key={index}
              className={cn(
                "p-4 rounded-xl border transition-all duration-300",
                "hover:scale-[1.01] hover:shadow-lg",
                colorMap[insight.type],
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                      {labelMap[insight.type]}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {insight.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightCard;
