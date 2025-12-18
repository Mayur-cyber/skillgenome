import { Button } from "@/components/ui/button";
import DNABackground from "@/components/DNABackground";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

interface LandingPageProps {
  onAnalyze: () => void;
}

const LandingPage = ({ onAnalyze }: LandingPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <Header />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">
                AI-POWERED SKILL ANALYSIS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Decodes </span>
              <span className="gradient-text text-glow-cyan">real skills</span>
              <span className="text-foreground">,</span>
              <br />
              <span className="text-foreground">depth, and </span>
              <span className="gradient-text text-glow-purple">future readiness</span>
              <br />
              <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">
                — beyond resumes.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Human Capital is a spectrum. Discover your unique{" "}
              <span className="text-primary font-semibold">Skill DNA</span>
              —complex, measurable, and interconnected chains that define your true potential.
            </p>

            {/* Features Row */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                { icon: Zap, text: "Deep Pattern Analysis" },
                { icon: Shield, text: "Enterprise Grade Security" },
                { icon: Sparkles, text: "AI-Driven Insights" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <UploadZone
              onFileUpload={(file) => console.log("File uploaded:", file.name)}
              onGithubConnect={(url) => console.log("GitHub:", url)}
            />
          </div>

          {/* CTA Button */}
          <div className="text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button
              variant="genome"
              size="xl"
              onClick={onAnalyze}
              className="group"
            >
              <span>Analyze My Genome</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              SECURE • PRIVATE • AI-POWERED
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default LandingPage;
