import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope } from "lucide-react";
import SymptomForm from "./SymptomForm";
import MedicineRecommendations from "./MedicineRecommendations";
import AppointmentBooking from "./AppointmentBooking";

export interface SymptomData {
  symptoms: string[];
  duration: string;
  severity: number;
  additionalInfo: string;
}

const SymptomChecker = () => {
  const [symptomData, setSymptomData] = useState<SymptomData | null>(null);
  const [activeTab, setActiveTab] = useState("symptoms");

  const handleSymptomSubmit = (data: SymptomData) => {
    setSymptomData(data);
    setActiveTab("recommendations");
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Symptom Checker
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe your symptoms and get instant AI-powered health insights, 
            medicine recommendations, and appointment booking assistance.
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/50 border-primary/20">
          <CardHeader className="pb-0">
            <CardTitle className="text-center text-primary">
              Complete Health Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="recommendations" disabled={!symptomData}>
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="appointment" disabled={!symptomData}>
                  Book Appointment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="symptoms" className="mt-6">
                <SymptomForm onSubmit={handleSymptomSubmit} />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                {symptomData && (
                  <MedicineRecommendations symptomData={symptomData} />
                )}
              </TabsContent>

              <TabsContent value="appointment" className="mt-6">
                {symptomData && (
                  <AppointmentBooking symptomData={symptomData} />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SymptomChecker;