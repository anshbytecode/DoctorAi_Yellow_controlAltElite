import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Video, 
  User,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import type { SymptomData } from "./SymptomChecker";

interface AppointmentBookingProps {
  symptomData: SymptomData;
}

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    rating: 4.9,
    nextAvailable: "Today 2:30 PM",
    location: "Medical Center Downtown",
    consultationFee: "$75"
  },
  {
    id: "2", 
    name: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    rating: 4.8,
    nextAvailable: "Tomorrow 10:00 AM",
    location: "City Health Clinic",
    consultationFee: "$85"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Family Medicine", 
    rating: 4.9,
    nextAvailable: "Tomorrow 3:15 PM",
    location: "Community Health Center",
    consultationFee: "$70"
  }
];

const AppointmentBooking = ({ symptomData }: AppointmentBookingProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor || !appointmentType || !selectedDate || !selectedTime || !patientName || !patientPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate booking
    setTimeout(() => {
      setIsBooked(true);
      toast.success("Appointment booked successfully!");
    }, 1000);
  };

  const getRecommendedUrgency = () => {
    if (symptomData.severity >= 8) return "urgent";
    if (symptomData.severity >= 6) return "same-day";
    return "routine";
  };

  const urgency = getRecommendedUrgency();

  if (isBooked) {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 text-green-600">
          <CheckCircle className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold">Appointment Confirmed!</h3>
            <p className="text-sm text-muted-foreground">
              Confirmation details sent to your phone
            </p>
          </div>
        </div>
        
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="pt-6">
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="font-medium">Doctor:</span>
                <span>{doctors.find(d => d.id === selectedDoctor)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date & Time:</span>
                <span>{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className="capitalize">{appointmentType} Consultation</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Fee:</span>
                <span>{doctors.find(d => d.id === selectedDoctor)?.consultationFee}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button variant="outline" onClick={() => setIsBooked(false)}>
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Urgency Recommendation */}
      <Card className={`border-2 ${
        urgency === "urgent" ? "border-red-200 bg-red-50/50" :
        urgency === "same-day" ? "border-yellow-200 bg-yellow-50/50" :
        "border-blue-200 bg-blue-50/50"
      }`}>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">
              Recommended timing: {
                urgency === "urgent" ? "Emergency/Urgent care" :
                urgency === "same-day" ? "Same day or within 24 hours" :
                "Within 1-2 weeks"
              }
            </span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleBookAppointment} className="space-y-6">
        {/* Doctor Selection */}
        <div>
          <Label className="text-base font-semibold">Select a Doctor</Label>
          <div className="mt-3 space-y-3">
            {doctors.map((doctor) => (
              <Card 
                key={doctor.id} 
                className={`cursor-pointer transition-all ${
                  selectedDoctor === doctor.id 
                    ? "border-primary bg-primary/5" 
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          ★ {doctor.rating}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {doctor.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doctor.nextAvailable}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{doctor.consultationFee}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Appointment Type */}
        <div>
          <Label className="text-base font-semibold">Consultation Type</Label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={appointmentType === "video" ? "default" : "outline"}
              className="justify-start gap-2"
              onClick={() => setAppointmentType("video")}
            >
              <Video className="w-4 h-4" />
              Video Call
            </Button>
            <Button
              type="button" 
              variant={appointmentType === "in-person" ? "default" : "outline"}
              className="justify-start gap-2"
              onClick={() => setAppointmentType("in-person")}
            >
              <MapPin className="w-4 h-4" />
              In-Person
            </Button>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="text-base font-semibold">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-base font-semibold">Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
            <Input
              id="name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-2"
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <Label htmlFor="notes" className="text-base font-semibold">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific concerns or information for the doctor..."
            className="mt-2"
            rows={3}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          <Calendar className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </form>
    </div>
  );
};

export default AppointmentBooking;