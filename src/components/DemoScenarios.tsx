import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, Calendar, Heart } from "lucide-react";

const DemoScenarios = () => {
  const scenarios = [
    {
      icon: AlertTriangle,
      title: "Emergency Case",
      severity: "Emergency",
      symptom: "Chest Pain",
      description: "Patient reports severe chest pain with shortness of breath",
      triage: "EMERGENCY",
      action: "Call Ambulance",
      result: "Immediate ER referral with location mapping",
      bgColor: "bg-gradient-to-br from-medical-red/10 to-medical-red/5",
      iconColor: "text-medical-red"
    },
    {
      icon: Calendar,
      title: "Teleconsult Case", 
      severity: "Urgent",
      symptom: "Fever (3 days)",
      description: "Patient has persistent fever with mild fatigue",
      triage: "URGENT CARE",
      action: "Book Doctor",
      result: "Auto-scheduled appointment within 2 hours",
      bgColor: "bg-gradient-to-br from-medical-blue/10 to-medical-blue/5",
      iconColor: "text-medical-blue"
    },
    {
      icon: Heart,
      title: "Self-Care Case",
      severity: "Mild",
      symptom: "Mild Headache",
      description: "Patient reports occasional headache after work",
      triage: "SELF-CARE",
      action: "Health Tips",
      result: "Hydration advice + gamified reward + reminder",
      bgColor: "bg-gradient-to-br from-medical-green/10 to-medical-green/5", 
      iconColor: "text-medical-green"
    }
  ];

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "Emergency": return "destructive";
      case "Urgent": return "default";
      default: return "secondary";
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live Demo Scenarios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how DoctorAI handles different medical situations with intelligent triage and appropriate actions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <Card key={index} className={`${scenario.bgColor} border-0 shadow-card hover:shadow-medical transition-all duration-300`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <scenario.icon className={`w-8 h-8 ${scenario.iconColor}`} />
                  <Badge variant={getSeverityVariant(scenario.severity)}>
                    {scenario.severity}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{scenario.title}</CardTitle>
                <p className="text-lg font-semibold text-muted-foreground">{scenario.symptom}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{scenario.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Triage Result:</span>
                    <Badge variant="outline" className={scenario.iconColor}>{scenario.triage}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">AI Action:</span>
                    <span className="text-sm text-muted-foreground">{scenario.action}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">{scenario.result}</p>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Try This Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
            Start Interactive Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoScenarios;