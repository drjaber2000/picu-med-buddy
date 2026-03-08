import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Weight, Ruler, Activity } from "lucide-react";

export interface PatientData {
  name: string;
  mrn: string;
  age: string;
  ageUnit: "months" | "years";
  weight: number;
  height: number;
  bmi: number | null;
}

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const [name, setName] = useState("");
  const [mrn, setMrn] = useState("");
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("years");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const weightNum = parseFloat(weight) || 0;
  const heightNum = parseFloat(height) || 0;
  const heightM = heightNum / 100;
  const bmi = weightNum > 0 && heightM > 0 ? weightNum / (heightM * heightM) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !weight || weightNum <= 0) return;
    onSubmit({
      name: name.trim(),
      mrn: mrn.trim(),
      age,
      ageUnit,
      weight: weightNum,
      height: heightNum,
      bmi,
    });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="flex items-center gap-2 text-primary text-lg">
          <User className="h-5 w-5" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                Patient Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter patient name"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="mrn" className="text-sm font-semibold text-foreground">
                MRN
              </Label>
              <Input
                id="mrn"
                value={mrn}
                onChange={(e) => setMrn(e.target.value)}
                placeholder="Medical Record Number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="age" className="text-sm font-semibold text-foreground">
                Age
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="999"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="flex-1"
                />
                <div className="flex rounded-md border border-input overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setAgeUnit("months")}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      ageUnit === "months"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    mo
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgeUnit("years")}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      ageUnit === "years"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    yr
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="weight" className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Weight className="h-3.5 w-3.5" /> Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                min="0.1"
                max="300"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="height" className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" /> Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                min="1"
                max="250"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="cm"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Activity className="h-3.5 w-3.5" /> BMI
              </Label>
              <div className="mt-1 h-10 flex items-center px-3 rounded-md bg-muted text-sm font-mono">
                {bmi ? bmi.toFixed(1) : "—"}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Go to Sedation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
