import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Heart } from "lucide-react";
import heroImage from "@/assets/heroDoctorAI.png";
import LoginModal from "@/components/loginCard"; // import your modal
import Example from "./lgn";
import setShowAuth from "@/pages/Index";

const Hero = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Login Button at Top-Right */}
      <div className="text-center my-6">
              <button
                onClick={() => setShowAuth(1)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                Log In / Sign Up
              </button>
            </div>

      {/* Hero overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Zap className="w-3 h-3 mr-2" />
                AI-Powered Healthcare
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                DoctorAI
                <span className="block text-foreground">Symptom Checker</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-md">
                Get instant, intelligent health guidance through our AI-powered symptom checker and virtual triage system.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Start Health Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const nextSection = document.getElementById("learnMore");
                  nextSection.scrollIntoView({ behavior: "smooth" });
                }}
              >
              Learn More
            </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-medical-red" />
                <span className="text-sm text-muted-foreground">24/7 Available</span>
              </div>
            </div>
          </div>


          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-medical">
              <img
                src={heroImage}
                alt="DoctorAI medical interface showing AI-powered health consultation"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(data) => console.log("Login data:", data)}
      />
    </section>
  );
};

export default Hero;
