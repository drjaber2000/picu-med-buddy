import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { User, Weight, Ruler, Activity, Circle } from "lucide-react";

export interface PatientData {
  name: string;
  mrn: string;
  age: string;
  ageUnit: "months" | "years";
  weight: number;
  height: number;
  bmi: number | null;
  bsa: number | null;
}

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const [name, setName] = useState("");
  const [mrn, setMrn] = useState("");
  const [age, setAge] = useState(0);
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("years");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const weightNum = weight;
  const heightNum = height;
  const heightM = heightNum / 100;
  const bmi = weightNum > 0 && heightM > 0 ? weightNum / (heightM * heightM) : null;
  const bsa = weightNum > 0 && heightNum > 0 ? Math.sqrt((heightNum * weightNum) / 3600) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || weightNum <= 0) return;
    onSubmit({
      name: name.trim(),
      mrn: mrn.trim(),
      age: String(age),
      ageUnit,
      weight: weightNum,
      height: heightNum,
      bmi,
      bsa,
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
              <Label className="text-sm font-semibold text-foreground flex items-center justify-between">
                <span>Age</span>
                <span className="font-mono text-primary">{age.toFixed(1)} {ageUnit === "months" ? "mo" : "yr"}</span>
              </Label>
              <div className="mt-3 space-y-2">
                <Slider
                  value={[age]}
                  onValueChange={(v) => setAge(v[0])}
                  min={0}
                  max={ageUnit === "months" ? 24 : 18}
                  step={1}
                />
                <div className="flex rounded-md border border-input overflow-hidden w-fit">
                  <button
                    type="button"
                    onClick={() => { setAgeUnit("months"); setAge(0); }}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      ageUnit === "months"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    mo
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAgeUnit("years"); setAge(0); }}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
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
              <Label className="text-sm font-semibold text-foreground flex items-center justify-between">
                <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> Height (cm)</span>
                <span className="font-mono text-primary">{height} cm</span>
              </Label>
              <Slider
                value={[height]}
                onValueChange={(v) => setHeight(v[0])}
                min={0}
                max={200}
                step={1}
                className="mt-3"
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

            <div>
              <Label className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Circle className="h-3.5 w-3.5" /> BSA (m²)
              </Label>
              <div className="mt-1 h-10 flex items-center px-3 rounded-md bg-muted text-sm font-mono">
                {bsa ? bsa.toFixed(3) : "—"}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Calculate Medications
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
