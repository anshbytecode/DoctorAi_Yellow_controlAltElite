import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import type { SymptomData } from "./SymptomChecker";

interface SymptomFormProps {
  onSubmit: (data: SymptomData) => void;
}

const commonSymptoms = [
  "Headache", "Fever", "Cough", "Sore throat", "Nausea", "Fatigue",
  "Dizziness", "Chest pain", "Shortness of breath", "Abdominal pain",
  "Joint pain", "Back pain", "Runny nose", "Congestion"
];

const SymptomForm = ({ onSubmit }: SymptomFormProps) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState([5]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setNewSymptom("");
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (symptoms.length === 0) {
      toast.error("Please add at least one symptom");
      return;
    }
    
    if (!duration) {
      toast.error("Please specify symptom duration");
      return;
    }

    const data: SymptomData = {
      symptoms,
      duration,
      severity: severity[0],
      additionalInfo
    };

    onSubmit(data);
    toast.success("Symptoms recorded! Generating recommendations...");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="symptoms" className="text-base font-semibold">
          What symptoms are you experiencing?
        </Label>
        <div className="mt-2 space-y-3">
          <div className="flex gap-2">
            <Input
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              placeholder="Type a symptom or select from common ones below"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptom(newSymptom))}
            />
            <Button 
              type="button" 
              onClick={() => addSymptom(newSymptom)}
              disabled={!newSymptom}
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSymptom(symptom)}
                disabled={symptoms.includes(symptom)}
                className="text-xs"
              >
                {symptom}
              </Button>
            ))}
          </div>

          {symptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Selected symptoms:</span>
              {symptoms.map((symptom) => (
                <Badge key={symptom} variant="secondary" className="gap-1">
                  {symptom}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeSymptom(symptom)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="duration" className="text-base font-semibold">
          How long have you had these symptoms?
        </Label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-than-1-day">Less than 1 day</SelectItem>
            <SelectItem value="1-3-days">1-3 days</SelectItem>
            <SelectItem value="4-7-days">4-7 days</SelectItem>
            <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
            <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
            <SelectItem value="more-than-1-month">More than 1 month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">
          How severe are your symptoms? ({severity[0]}/10)
        </Label>
        <div className="mt-3 px-2">
          <Slider
            value={severity}
            onValueChange={setSeverity}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Mild (1)</span>
            <span>Moderate (5)</span>
            <span>Severe (10)</span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="additional" className="text-base font-semibold">
          Additional Information (Optional)
        </Label>
        <Textarea
          id="additional"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Any other details about your symptoms, medical history, or current medications..."
          className="mt-2"
          rows={4}
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Analyze Symptoms
      </Button>
    </form>
  );
};

export default SymptomForm;