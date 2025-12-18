import { BarChart3 } from "lucide-react";

const percentileData = [
  { category: "Overall Readiness", percentile: 72, color: "primary" },
  { category: "Technical Skills", percentile: 68, color: "primary" },
  { category: "Soft Skills", percentile: 78, color: "accent" },
  { category: "Domain Knowledge", percentile: 65, color: "secondary" },
  { category: "Problem Solving", percentile: 82, color: "accent" },
];

const PercentileRankings = () => {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Industry Percentile</h3>
          <p className="text-xs text-muted-foreground font-mono">VS 10K+ PROFESSIONALS</p>
        </div>
      </div>

      <div className="space-y-5">
        {percentileData.map((item, index) => (
          <div
            key={item.category}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">{item.category}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-primary">
                  Top {100 - item.percentile}%
                </span>
              </div>
            </div>
            <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden">
              {/* Industry Average Marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/50 z-10"
                style={{ left: "50%" }}
              />
              {/* Progress Bar */}
              <div
                className={`absolute h-full rounded-full transition-all duration-1000 ease-out ${
                  item.color === "accent"
                    ? "bg-gradient-to-r from-accent/80 to-accent"
                    : item.color === "secondary"
                    ? "bg-gradient-to-r from-secondary/80 to-secondary"
                    : "bg-gradient-to-r from-primary/80 to-primary"
                }`}
                style={{
                  width: `${item.percentile}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              />
              {/* User Position Indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background z-20 animate-pulse"
                style={{
                  left: `calc(${item.percentile}% - 8px)`,
                  backgroundColor:
                    item.color === "accent"
                      ? "hsl(115, 100%, 61%)"
                      : item.color === "secondary"
                      ? "hsl(270, 76%, 53%)"
                      : "hsl(186, 100%, 50%)",
                  boxShadow:
                    item.color === "accent"
                      ? "0 0 10px hsl(115, 100%, 61%, 0.5)"
                      : item.color === "secondary"
                      ? "0 0 10px hsl(270, 76%, 53%, 0.5)"
                      : "0 0 10px hsl(186, 100%, 50%, 0.5)",
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground font-mono">0%</span>
              <span className="text-[10px] text-muted-foreground font-mono">AVG</span>
              <span className="text-[10px] text-muted-foreground font-mono">100%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Badge */}
      <div className="mt-6 p-3 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Average Ranking</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-accent">73rd</span>
            <span className="text-xs text-muted-foreground">percentile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentileRankings;
