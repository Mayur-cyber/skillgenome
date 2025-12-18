interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < current
                ? "bg-accent"
                : index === current
                ? "bg-primary animate-pulse w-3 h-3"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <span className="text-sm font-mono text-muted-foreground">
        Question <span className="text-primary">{current}</span> of {total}
      </span>

      {/* Analysis indicator */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-mono text-primary">Real-time Analysis</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
