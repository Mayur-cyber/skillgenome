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
      
      {/* Floating Orb Decorations */}
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />
      
      <Header />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card mb-8 border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-mono text-foreground/80 tracking-wider">
                AI-POWERED SKILL ANALYSIS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
              <span className="text-foreground">From resume data to </span>
              <span className="gradient-text text-glow-cyan">talent intelligence</span>
              <span className="text-foreground">:</span>
              <br />
              <span className="text-foreground">quantifying </span>
              <span className="gradient-text text-glow-purple">skill, depth, and future readiness</span>
              <span className="text-foreground">.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
              Human Capital is a spectrum. Discover your unique{" "}
              <span className="text-primary font-bold">Skill DNA</span>
              —complex, measurable, and interconnected chains that define your true potential.
            </p>

            {/* Features Row */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {[
                { icon: Zap, text: "Deep Pattern Analysis" },
                { icon: Shield, text: "Enterprise Grade Security" },
                { icon: Sparkles, text: "AI-Driven Insights" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div className="mb-14 animate-fade-in" style={{ animationDelay: "200ms" }}>
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
              className="group text-lg px-12"
            >
              <span>Analyze My Genome</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <p className="text-xs text-muted-foreground mt-6 font-mono tracking-widest">
              SECURE • PRIVATE • AI-POWERED
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default LandingPage;
