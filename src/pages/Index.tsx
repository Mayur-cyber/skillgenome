import { useState } from "react";
import LandingPage from "./LandingPage";
import InterviewPage from "./InterviewPage";
import DashboardPage from "./DashboardPage";

type AppState = "landing" | "interview" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");

  const handleAnalyze = () => {
    setAppState("interview");
  };

  const handleInterviewComplete = () => {
    setAppState("dashboard");
  };

  const handleRestart = () => {
    setAppState("landing");
  };

  switch (appState) {
    case "landing":
      return <LandingPage onAnalyze={handleAnalyze} />;
    case "interview":
      return <InterviewPage onComplete={handleInterviewComplete} />;
    case "dashboard":
      return <DashboardPage onRestart={handleRestart} />;
    default:
      return <LandingPage onAnalyze={handleAnalyze} />;
  }
};

export default Index;
