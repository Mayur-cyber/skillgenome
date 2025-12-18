import { useState } from "react";
import { GitBranch, ChevronRight, Star, Clock, Target } from "lucide-react";

interface CareerPath {
  id: string;
  title: string;
  matchPercentage: number;
  timeline: string;
  roles: string[];
  requiredSkills: string[];
  color: "primary" | "secondary" | "accent";
}

const careerPaths: CareerPath[] = [
  {
    id: "frontend",
    title: "Frontend Specialist",
    matchPercentage: 87,
    timeline: "1-2 years",
    roles: ["Senior Frontend Engineer", "Tech Lead", "Principal Engineer"],
    requiredSkills: ["Advanced React Patterns", "Performance Optimization", "Design Systems"],
    color: "primary",
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    matchPercentage: 74,
    timeline: "2-3 years",
    roles: ["Full Stack Developer", "Engineering Manager", "VP Engineering"],
    requiredSkills: ["Backend Architecture", "Database Design", "DevOps Basics"],
    color: "secondary",
  },
  {
    id: "architect",
    title: "Platform Architect",
    matchPercentage: 62,
    timeline: "3-4 years",
    roles: ["DevOps Engineer", "Platform Architect", "CTO"],
    requiredSkills: ["Cloud Infrastructure", "System Design", "Security"],
    color: "accent",
  },
];

const CareerPathVisualization = () => {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const getColorClass = (color: CareerPath["color"], type: "bg" | "text" | "border") => {
    const colors = {
      primary: { bg: "bg-primary", text: "text-primary", border: "border-primary" },
      secondary: { bg: "bg-secondary", text: "text-secondary", border: "border-secondary" },
      accent: { bg: "bg-accent", text: "text-accent", border: "border-accent" },
    };
    return colors[color][type];
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Career Trajectories</h3>
          <p className="text-xs text-muted-foreground font-mono">AI-POWERED PATHWAYS</p>
        </div>
      </div>

      {/* Current Position */}
      <div className="relative mb-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-glass-border">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <div>
            <p className="text-sm font-medium text-foreground">Current: Mid-Level Developer</p>
            <p className="text-xs text-muted-foreground font-mono">2.5 YOE • Frontend Focus</p>
          </div>
        </div>
        {/* Connecting line */}
        <div className="absolute left-[17px] top-full w-0.5 h-4 bg-gradient-to-b from-primary to-transparent" />
      </div>

      {/* Career Paths */}
      <div className="space-y-3">
        {careerPaths.map((path, index) => (
          <div
            key={path.id}
            className={`relative transition-all duration-300 ${
              hoveredPath === path.id ? "scale-[1.02]" : ""
            }`}
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {/* Branch connector */}
            {index === 0 && (
              <div className="absolute -top-4 left-[17px] w-0.5 h-4 bg-gradient-to-b from-transparent to-muted-foreground/30" />
            )}

            <button
              onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                expandedPath === path.id
                  ? `bg-muted/40 ${getColorClass(path.color, "border")}/30`
                  : "bg-muted/20 border-glass-border hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${getColorClass(path.color, "bg")}`}
                    style={{
                      boxShadow:
                        hoveredPath === path.id
                          ? `0 0 10px hsl(var(--${path.color}))`
                          : "none",
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{path.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">
                        {path.timeline}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className={`w-3 h-3 ${getColorClass(path.color, "text")}`} />
                      <span className={`font-mono text-sm font-bold ${getColorClass(path.color, "text")}`}>
                        {path.matchPercentage}%
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Match</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      expandedPath === path.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPath === path.id && (
                <div className="mt-4 pt-4 border-t border-glass-border animate-fade-in">
                  {/* Role Progression */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-mono">PROGRESSION</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {path.roles.map((role, i) => (
                        <div key={role} className="flex items-center gap-2">
                          <span className="text-xs text-foreground bg-muted/50 px-2 py-1 rounded">
                            {role}
                          </span>
                          {i < path.roles.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-mono flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      SKILLS TO DEVELOP
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {path.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className={`text-xs px-2 py-1 rounded-full border ${getColorClass(
                            path.color,
                            "border"
                          )}/30 ${getColorClass(path.color, "text")}/80`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-glass-border">
        <p className="text-xs text-center text-muted-foreground">
          Based on your <span className="text-primary font-mono">Skill DNA</span> and market trends
        </p>
      </div>
    </div>
  );
};

export default CareerPathVisualization;
