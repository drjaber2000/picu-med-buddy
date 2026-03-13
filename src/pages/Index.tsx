import { useState } from "react";
import PatientForm, { PatientData } from "@/components/PatientForm";
import MedicationTable from "@/components/MedicationTable";
import { medications, medicationCategories } from "@/data/medications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, RotateCcw, User, Weight, Ruler, Activity } from "lucide-react";

const Index = () => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredMeds = activeCategory === "all"
    ? medications
    : medications.filter((m) => m.category === activeCategory);

  const groupedMeds = medicationCategories
    .filter((cat) => activeCategory === "all" || cat === activeCategory)
    .map((cat) => ({
      category: cat,
      meds: filteredMeds.filter((m) => m.category === cat),
    }))
    .filter((g) => g.meds.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Stethoscope className="h-7 w-7" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">PICU Medication Calculator</h1>
            <p className="text-sm opacity-80">Pediatric Intensive Care Unit — Quick Reference</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Disclaimer */}
        <div className="rounded-lg bg-warning/10 border border-warning/30 px-4 py-3 text-sm text-warning">
          <strong>⚠ Clinical Disclaimer:</strong> This tool is for reference only. Always verify doses with
          institutional protocols and pharmacy. Not a substitute for clinical judgment.
        </div>

        {!patient ? (
          <div className="max-w-xl mx-auto">
            <PatientForm onSubmit={setPatient} />
          </div>
        ) : (
          <>
            {/* Patient summary bar */}
            <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card border px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-semibold">{patient.name}</span>
                {patient.mrn && (
                  <Badge variant="secondary" className="font-mono text-xs">MRN: {patient.mrn}</Badge>
                )}
              </div>
              {patient.age && (
                <Badge variant="secondary">
                  {patient.age} {patient.ageUnit}
                </Badge>
              )}
              <Badge variant="outline" className="font-mono">
                <Weight className="h-3 w-3 mr-1" />
                {patient.weight} kg
              </Badge>
              {patient.height > 0 && (
                <Badge variant="outline" className="font-mono">
                  <Ruler className="h-3 w-3 mr-1" />
                  {patient.height} cm
                </Badge>
              )}
              {patient.bmi && (
                <Badge variant="outline" className="font-mono">
                  <Activity className="h-3 w-3 mr-1" />
                  BMI {patient.bmi.toFixed(1)}
                </Badge>
              )}
              {patient.bsa && (
                <Badge variant="outline" className="font-mono">
                  BSA {patient.bsa.toFixed(3)} m²
                </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPatient(null)}
                className="ml-auto"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                New Patient
              </Button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
              >
                All Categories
              </Button>
              {medicationCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Medication tables */}
            <div className="space-y-6">
              {groupedMeds.map(({ category, meds }) => (
                <MedicationTable
                  key={category}
                  category={category}
                  medications={meds}
                  weight={patient.weight}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t mt-12 py-4 text-center text-xs text-muted-foreground">
        PICU Calculator v1.0 — For clinical reference only
      </footer>
    </div>
  );
};

export default Index;
