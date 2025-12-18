import { useState } from "react";
import { Button } from "@/components/ui/button";
import DNABackground from "@/components/DNABackground";
import Header from "@/components/Header";
import AIOrb from "@/components/AIOrb";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewPageProps {
  onComplete: () => void;
}

const questions = [
  {
    id: 1,
    text: "Explain how you would optimize a slow API under heavy load, considering trade-offs between caching, database indexing, and horizontal scaling.",
    category: "System Design",
  },
  {
    id: 2,
    text: "Describe a complex technical challenge you faced and how you approached breaking it down into manageable components.",
    category: "Problem Solving",
  },
  {
    id: 3,
    text: "How do you ensure code quality and maintainability in a fast-paced development environment?",
    category: "Best Practices",
  },
  {
    id: 4,
    text: "Explain the concept of eventual consistency and when you would choose it over strong consistency.",
    category: "Distributed Systems",
  },
  {
    id: 5,
    text: "How would you communicate a major technical decision to non-technical stakeholders?",
    category: "Communication",
  },
];

const InterviewPage = ({ onComplete }: InterviewPageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!answer.trim()) return;

    setIsThinking(true);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      setIsThinking(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setAnswer("");
      } else {
        onComplete();
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <Header />

      <main className="relative z-10 pt-28 pb-20 px-6 min-h-screen flex flex-col">
        <div className="container mx-auto max-w-4xl flex-1 flex flex-col">
          {/* Progress */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <ProgressIndicator current={currentQuestion + 1} total={questions.length} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-12">
            {/* AI Orb */}
            <div className="animate-scale-in">
              <AIOrb isActive={true} isThinking={isThinking} />
            </div>

            {/* Question Card */}
            <div className="w-full max-w-3xl glass-card p-8 animate-fade-in-up">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-xs font-mono text-primary">
                  {questions[currentQuestion].category.toUpperCase()}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground leading-relaxed mb-8">
                {questions[currentQuestion].text}
              </h2>

              {/* Answer Input */}
              <div className="space-y-4">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your thoughtful response here..."
                  disabled={isThinking}
                  className={cn(
                    "w-full h-40 p-4 rounded-xl resize-none",
                    "bg-muted/50 border border-border",
                    "text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                    "transition-all duration-300",
                    isThinking && "opacity-50"
                  )}
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    Press ⌘+Enter to submit
                  </span>

                  <Button
                    variant="genome"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isThinking}
                    className="group"
                  >
                    {isThinking ? (
                      <>Analyzing...</>
                    ) : currentQuestion === questions.length - 1 ? (
                      <>
                        Complete Analysis
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <>
                        Submit Answer
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Hint */}
            <p className="text-sm text-muted-foreground text-center max-w-lg">
              Take your time. Our AI evaluates the depth and quality of your reasoning,
              not just keywords. Detailed, thoughtful answers yield more accurate genome mapping.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;
