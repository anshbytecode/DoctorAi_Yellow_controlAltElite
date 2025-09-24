import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, AlertTriangle, Calendar, Award, Bell, Globe } from "lucide-react";

interface FeaturesProps {
  id?: string; // optional id for scrolling
}

const Features = ({ id }: FeaturesProps) => {
  const coreFeatures = [
    {
      icon: MessageSquare,
      title: "Conversational Symptom Checker",
      description: "Natural language symptom assessment with intelligent follow-up questions.",
      priority: "Must Have",
      color: "text-medical-blue"
    },
    {
      icon: AlertTriangle,
      title: "Smart Triage System",
      description: "Emergency/Urgent/PCP/Self-care classification with safety protocols.",
      priority: "Must Have", 
      color: "text-medical-red"
    },
    {
      icon: Calendar,
      title: "Teleconsult Booking",
      description: "Seamless appointment scheduling with healthcare providers.",
      priority: "Should Have",
      color: "text-medical-green"
    }
  ];

  const advancedFeatures = [
    {
      icon: Award,
      title: "Health Rewards",
      description: "Gamified health tracking with coins and achievement system.",
      priority: "Should Have",
      color: "text-accent"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Personalized follow-up notifications and medication alerts.",
      priority: "Should Have",
      color: "text-medical-orange"
    },
    {
      icon: Globe,
      title: "Multi-Channel Support",
      description: "Available on web, mobile app, WhatsApp, and other platforms.",
      priority: "Nice to Have",
      color: "text-primary"
    }
  ];

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Must Have": return "destructive";
      case "Should Have": return "secondary";
      default: return "outline";
    }
  };

  return (
    <section id={id} className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Healthcare AI Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with Yellow.ai SDK and Netroloite orchestration for enterprise-grade healthcare solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-medical transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <Badge variant={getPriorityVariant(feature.priority)} className="text-xs">
                    {feature.priority}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedFeatures.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-medical transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <Badge variant={getPriorityVariant(feature.priority)} className="text-xs">
                    {feature.priority}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
