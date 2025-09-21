import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Pill, 
  Clock, 
  Info, 
  Heart, 
  Thermometer,
  Shield
} from "lucide-react";
import type { SymptomData } from "./SymptomChecker";

interface MedicineRecommendationsProps {
  symptomData: SymptomData;
}

const MedicineRecommendations = ({ symptomData }: MedicineRecommendationsProps) => {
  // Mock AI analysis based on symptoms
  const getRecommendations = () => {
    const { symptoms, severity, duration } = symptomData;
    
    // Simple logic for demo - in real app this would be AI-powered
    const hasRespiratory = symptoms.some(s => 
      ["cough", "sore throat", "runny nose", "congestion"].includes(s.toLowerCase())
    );
    const hasPain = symptoms.some(s => 
      ["headache", "joint pain", "back pain", "chest pain"].includes(s.toLowerCase())
    );
    const hasFever = symptoms.includes("Fever");
    const isUrgent = severity >= 8 || symptoms.some(s => 
      ["chest pain", "shortness of breath"].includes(s.toLowerCase())
    );

    return {
      urgencyLevel: isUrgent ? "urgent" : severity >= 6 ? "moderate" : "mild",
      medicines: [
        ...(hasFever ? [{
          name: "Acetaminophen (Tylenol)",
          dosage: "500mg every 4-6 hours",
          purpose: "Fever reduction and pain relief",
          icon: Thermometer
        }] : []),
        ...(hasPain ? [{
          name: "Ibuprofen (Advil)",
          dosage: "400mg every 6-8 hours",
          purpose: "Pain and inflammation relief",
          icon: Heart
        }] : []),
        ...(hasRespiratory ? [{
          name: "Honey & Warm Water",
          dosage: "1-2 tablespoons as needed",
          purpose: "Soothe throat and suppress cough",
          icon: Shield
        }] : [])
      ],
      homeRemedies: [
        "Stay hydrated - drink plenty of fluids",
        "Get adequate rest (7-9 hours of sleep)",
        "Use a humidifier to ease breathing",
        "Gargle with warm salt water for throat pain"
      ]
    };
  };

  const recommendations = getRecommendations();

  const urgencyColors = {
    urgent: "bg-destructive/10 border-destructive text-destructive",
    moderate: "bg-yellow-500/10 border-yellow-500 text-yellow-700",
    mild: "bg-green-500/10 border-green-500 text-green-700"
  };

  const urgencyIcons = {
    urgent: AlertTriangle,
    moderate: Info,
    mild: Info
  };

  const UrgencyIcon = urgencyIcons[recommendations.urgencyLevel];

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <Alert className="border-yellow-500/50 bg-yellow-500/5">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-sm">
          <strong>Medical Disclaimer:</strong> These are general recommendations only. 
          This is not a substitute for professional medical advice. Always consult 
          with a healthcare provider before taking any medication.
        </AlertDescription>
      </Alert>

      {/* Urgency Level */}
      <Card className={`border-2 ${urgencyColors[recommendations.urgencyLevel]}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <UrgencyIcon className="w-5 h-5" />
            Assessment: {recommendations.urgencyLevel.charAt(0).toUpperCase() + recommendations.urgencyLevel.slice(1)} Priority
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.urgencyLevel === "urgent" && (
            <p className="text-sm">
              Your symptoms indicate this may require immediate medical attention. 
              Please consider seeking emergency care or contacting your doctor immediately.
            </p>
          )}
          {recommendations.urgencyLevel === "moderate" && (
            <p className="text-sm">
              Your symptoms suggest you should monitor your condition closely. 
              Consider scheduling an appointment with your healthcare provider within 24-48 hours.
            </p>
          )}
          {recommendations.urgencyLevel === "mild" && (
            <p className="text-sm">
              Your symptoms appear to be manageable with self-care. 
              Monitor your condition and seek medical care if symptoms worsen.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Medicine Recommendations */}
      {recommendations.medicines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              Suggested Medications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.medicines.map((medicine, index) => {
              const Icon = medicine.icon;
              return (
                <div key={index} className="flex gap-3 p-3 border rounded-lg">
                  <Icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{medicine.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {medicine.dosage}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{medicine.purpose}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Home Remedies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Home Care Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.homeRemedies.map((remedy, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {remedy}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator />
      
      <div className="text-center text-xs text-muted-foreground">
        Generated recommendations based on reported symptoms • Always consult a healthcare professional
      </div>
    </div>
  );
};

export default MedicineRecommendations;