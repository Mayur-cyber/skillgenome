import { Dna } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-0 border-b border-glass-border rounded-none backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                <Dna className="w-5 h-5 text-primary-foreground relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="gradient-text">Skill</span>
                  <span className="text-foreground">Genome</span>
                </h1>
              </div>
            </div>

            {/* Status */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
