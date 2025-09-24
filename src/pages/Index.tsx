import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DemoScenarios from "@/components/DemoScenarios";
import SymptomChecker from "@/components/SymptomChecker";
import AuthPage from "@/components/authManager"; // import your AuthPage

const Index = (p0: number) => {
  const [showAuth, setShowAuth] = useState(false); // state to show auth modals

  return (
    <main className="min-h-screen">
      <Hero />
      <Features id="learnMore"/>
      <SymptomChecker />
      <DemoScenarios />

      {/* Button to open login/signup */}
      

      {/* Render AuthPage modals when showAuth is true */}
      {showAuth && <AuthPage />}
    </main>
  );
};

export default Index;
