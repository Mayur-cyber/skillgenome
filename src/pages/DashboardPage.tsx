import { useEffect, useState } from "react";
import DNABackground from "@/components/DNABackground";
import Header from "@/components/Header";
import SkillRadarChart from "@/components/SkillRadarChart";
import ReadinessGauge from "@/components/ReadinessGauge";
import SkillScoreList from "@/components/SkillScoreList";
import InsightCard from "@/components/InsightCard";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";

const skillData = [
  { name: "JavaScript", score: 78, category: "technical" as const },
  { name: "System Design", score: 65, category: "technical" as const },
  { name: "DSA", score: 58, category: "technical" as const },
  { name: "Communication", score: 70, category: "soft" as const },
  { name: "Problem Solving", score: 82, category: "soft" as const },
  { name: "API Design", score: 72, category: "technical" as const },
  { name: "Testing", score: 55, category: "technical" as const },
  { name: "Documentation", score: 68, category: "soft" as const },
];

const skillScores = [
  { name: "JavaScript", score: 78, category: "Frontend" },
  { name: "System Design", score: 65, category: "Architecture" },
  { name: "Data Structures", score: 58, category: "Algorithms" },
  { name: "Communication", score: 70, category: "Soft Skill" },
  { name: "Problem Solving", score: 82, category: "Cognitive" },
  { name: "API Design", score: 72, category: "Backend" },
];

const insights = [
  {
    type: "gap" as const,
    title: "Strong logic in JS, but weak async handling patterns",
    description: "Consider deepening knowledge of Promises, async/await, and event loop mechanics.",
  },
  {
    type: "gap" as const,
    title: "DSA recursion explanations lacked edge case coverage",
    description: "Practice explaining base cases and termination conditions more explicitly.",
  },
  {
    type: "strength" as const,
    title: "Exceptional problem decomposition abilities",
    description: "Your systematic approach to breaking down complex problems is above industry average.",
  },
  {
    type: "growth" as const,
    title: "System design knowledge shows strong foundation",
    description: "With focused practice on distributed systems, you could reach senior-level proficiency.",
  },
  {
    type: "recommendation" as const,
    title: "Focus on real-world async patterns",
    description: "Build a project involving complex async flows like real-time data or background jobs.",
  },
];

interface DashboardPageProps {
  onRestart: () => void;
}

const DashboardPage = ({ onRestart }: DashboardPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <Header />

      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Your <span className="gradient-text">Skill Genome</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Comprehensive analysis of your human capital depth
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="glass" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="glass" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={onRestart}>
                <RefreshCw className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Skill DNA Map */}
            <div
              className={`lg:col-span-7 glass-card p-6 flex flex-col items-center justify-center ${
                isLoaded ? "animate-scale-in" : "opacity-0"
              }`}
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground text-center">Skill DNA Map</h2>
                <p className="text-xs text-muted-foreground font-mono text-center">
                  MULTI-DIMENSIONAL ANALYSIS
                </p>
              </div>
              <div className="w-full flex justify-center overflow-hidden">
                <div className="transform scale-[0.85] sm:scale-100">
                  <SkillRadarChart skills={skillData} size={400} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Readiness Gauge */}
              <div
                className={`glass-card p-6 ${
                  isLoaded ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex justify-center">
                  <ReadinessGauge level="Mid-Senior Level" percentage={72} />
                </div>
              </div>

              {/* Skill Scores */}
              <div
                className={isLoaded ? "animate-fade-in" : "opacity-0"}
                style={{ animationDelay: "400ms" }}
              >
                <SkillScoreList skills={skillScores} />
              </div>
            </div>

            {/* Bottom: Insights */}
            <div
              className={`lg:col-span-12 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "600ms" }}
            >
              <InsightCard insights={insights} />
            </div>
          </div>

          {/* Mobile-specific DNA visualization note */}
          <div className="mt-8 text-center lg:hidden">
            <p className="text-xs text-muted-foreground font-mono">
              ROTATE DEVICE FOR ENHANCED VISUALIZATION
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
