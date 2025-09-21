import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DemoScenarios from "@/components/DemoScenarios";
import SymptomChecker from "@/components/SymptomChecker";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <SymptomChecker />
      <DemoScenarios />
    </main>
  );
};

export default Index;