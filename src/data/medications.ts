export interface Medication {
  name: string;
  category: string;
  dosePerKg: string;
  unit: string;
  route: string;
  frequency: string;
  maxDose?: string;
  notes?: string;
  calculate: (weightKg: number) => string;
}

export const medicationCategories = [
  "Sedation & Analgesia",
  "Inotropes & Vasopressors",
  "Insulin & Electrolytes",
  "IV Fluids",
  "Blood Products",
  "Anticonvulsants",
  "Resuscitation",
] as const;

export type MedicationCategory = (typeof medicationCategories)[number];

export const medications: Medication[] = [
  // Sedation & Analgesia
  {
    name: "Midazolam (Bolus)",
    category: "Sedation & Analgesia",
    dosePerKg: "0.05–0.1 mg/kg",
    unit: "mg",
    route: "IV",
    frequency: "PRN",
    maxDose: "5 mg",
    notes: "Give slowly over 2–3 min",
    calculate: (w) => `${(w * 0.05).toFixed(2)} – ${(w * 0.1).toFixed(2)} mg IV`,
  },
  {
    name: "Midazolam (Infusion)",
    category: "Sedation & Analgesia",
    dosePerKg: "0.5–2 mcg/kg/min",
    unit: "mcg/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    calculate: (w) => `${(w * 0.5 * 60 / 1000).toFixed(2)} – ${(w * 2 * 60 / 1000).toFixed(2)} mg/hr`,
  },
  {
    name: "Morphine (Bolus)",
    category: "Sedation & Analgesia",
    dosePerKg: "0.05–0.1 mg/kg",
    unit: "mg",
    route: "IV",
    frequency: "Q2-4H PRN",
    maxDose: "10 mg",
    calculate: (w) => `${(w * 0.05).toFixed(2)} – ${(w * 0.1).toFixed(2)} mg IV`,
  },
  {
    name: "Morphine (Infusion)",
    category: "Sedation & Analgesia",
    dosePerKg: "10–40 mcg/kg/hr",
    unit: "mcg/kg/hr",
    route: "IV infusion",
    frequency: "Continuous",
    calculate: (w) => `${(w * 10 / 1000).toFixed(3)} – ${(w * 40 / 1000).toFixed(3)} mg/hr`,
  },
  {
    name: "Fentanyl (Bolus)",
    category: "Sedation & Analgesia",
    dosePerKg: "1–2 mcg/kg",
    unit: "mcg",
    route: "IV",
    frequency: "PRN",
    maxDose: "100 mcg",
    calculate: (w) => `${(w * 1).toFixed(1)} – ${(w * 2).toFixed(1)} mcg IV`,
  },
  {
    name: "Fentanyl (Infusion)",
    category: "Sedation & Analgesia",
    dosePerKg: "1–3 mcg/kg/hr",
    unit: "mcg/kg/hr",
    route: "IV infusion",
    frequency: "Continuous",
    calculate: (w) => `${(w * 1).toFixed(1)} – ${(w * 3).toFixed(1)} mcg/hr`,
  },
  {
    name: "Dexmedetomidine",
    category: "Sedation & Analgesia",
    dosePerKg: "0.2–1 mcg/kg/hr",
    unit: "mcg/kg/hr",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "Monitor for bradycardia & hypotension",
    calculate: (w) => `${(w * 0.2).toFixed(2)} – ${(w * 1).toFixed(2)} mcg/hr`,
  },
  {
    name: "Ketamine (Bolus)",
    category: "Sedation & Analgesia",
    dosePerKg: "1–2 mg/kg",
    unit: "mg",
    route: "IV",
    frequency: "PRN",
    notes: "Procedural sedation",
    calculate: (w) => `${(w * 1).toFixed(1)} – ${(w * 2).toFixed(1)} mg IV`,
  },
  {
    name: "Propofol (Infusion)",
    category: "Sedation & Analgesia",
    dosePerKg: "1–4 mg/kg/hr",
    unit: "mg/kg/hr",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "Avoid prolonged use in children (propofol infusion syndrome)",
    calculate: (w) => `${(w * 1).toFixed(1)} – ${(w * 4).toFixed(1)} mg/hr`,
  },
  {
    name: "Paracetamol (IV)",
    category: "Sedation & Analgesia",
    dosePerKg: "15 mg/kg",
    unit: "mg",
    route: "IV",
    frequency: "Q6H",
    maxDose: "1000 mg",
    calculate: (w) => {
      const dose = Math.min(w * 15, 1000);
      return `${dose.toFixed(1)} mg IV Q6H`;
    },
  },

  // Inotropes & Vasopressors
  {
    name: "Dopamine",
    category: "Inotropes & Vasopressors",
    dosePerKg: "2–20 mcg/kg/min",
    unit: "mcg/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "Low dose (2-5): renal; Mid (5-10): inotropic; High (>10): vasopressor",
    calculate: (w) => `${(w * 2 * 60 / 1000).toFixed(2)} – ${(w * 20 * 60 / 1000).toFixed(2)} mg/hr`,
  },
  {
    name: "Dobutamine",
    category: "Inotropes & Vasopressors",
    dosePerKg: "2–20 mcg/kg/min",
    unit: "mcg/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    calculate: (w) => `${(w * 2 * 60 / 1000).toFixed(2)} – ${(w * 20 * 60 / 1000).toFixed(2)} mg/hr`,
  },
  {
    name: "Epinephrine (Infusion)",
    category: "Inotropes & Vasopressors",
    dosePerKg: "0.01–1 mcg/kg/min",
    unit: "mcg/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "Central line preferred",
    calculate: (w) => `${(w * 0.01 * 60 / 1000).toFixed(4)} – ${(w * 1 * 60 / 1000).toFixed(3)} mg/hr`,
  },
  {
    name: "Norepinephrine",
    category: "Inotropes & Vasopressors",
    dosePerKg: "0.01–2 mcg/kg/min",
    unit: "mcg/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "Central line required",
    calculate: (w) => `${(w * 0.01 * 60 / 1000).toFixed(4)} – ${(w * 2 * 60 / 1000).toFixed(3)} mg/hr`,
  },
  {
    name: "Milrinone",
    category: "Inotropes & Vasopressors",
    dosePerKg: "0.25–0.75 mcg/kg/min",
    unit: "mcg/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "Loading dose: 50 mcg/kg over 10-60 min (optional)",
    calculate: (w) => `${(w * 0.25 * 60 / 1000).toFixed(3)} – ${(w * 0.75 * 60 / 1000).toFixed(3)} mg/hr (Load: ${(w * 50 / 1000).toFixed(2)} mg)`,
  },
  {
    name: "Vasopressin",
    category: "Inotropes & Vasopressors",
    dosePerKg: "0.0002–0.002 units/kg/min",
    unit: "units/kg/min",
    route: "IV infusion",
    frequency: "Continuous",
    calculate: (w) => `${(w * 0.0002 * 60).toFixed(3)} – ${(w * 0.002 * 60).toFixed(3)} units/hr`,
  },

  // Insulin & Electrolytes
  {
    name: "Insulin (Regular) Infusion",
    category: "Insulin & Electrolytes",
    dosePerKg: "0.05–0.1 units/kg/hr",
    unit: "units/kg/hr",
    route: "IV infusion",
    frequency: "Continuous",
    notes: "For DKA: start 0.05-0.1 U/kg/hr. Monitor glucose hourly.",
    calculate: (w) => `${(w * 0.05).toFixed(2)} – ${(w * 0.1).toFixed(2)} units/hr`,
  },
  {
    name: "Calcium Gluconate 10%",
    category: "Insulin & Electrolytes",
    dosePerKg: "0.5–1 mL/kg",
    unit: "mL",
    route: "IV slow push",
    frequency: "PRN",
    maxDose: "20 mL",
    notes: "Give slowly with cardiac monitoring",
    calculate: (w) => `${(w * 0.5).toFixed(1)} – ${(w * 1).toFixed(1)} mL IV`,
  },
  {
    name: "Potassium Chloride (IV)",
    category: "Insulin & Electrolytes",
    dosePerKg: "0.5–1 mEq/kg",
    unit: "mEq",
    route: "IV",
    frequency: "Over 1-2 hr",
    maxDose: "40 mEq",
    notes: "Max rate: 0.5 mEq/kg/hr via central line",
    calculate: (w) => {
      const dose = Math.min(w * 1, 40);
      return `${(w * 0.5).toFixed(1)} – ${dose.toFixed(1)} mEq IV`;
    },
  },
  {
    name: "Sodium Bicarbonate 8.4%",
    category: "Insulin & Electrolytes",
    dosePerKg: "1–2 mEq/kg",
    unit: "mEq",
    route: "IV slow push",
    frequency: "PRN",
    notes: "Dilute 1:1 with D5W in neonates",
    calculate: (w) => `${(w * 1).toFixed(1)} – ${(w * 2).toFixed(1)} mEq IV`,
  },
  {
    name: "Magnesium Sulfate",
    category: "Insulin & Electrolytes",
    dosePerKg: "25–50 mg/kg",
    unit: "mg",
    route: "IV over 20 min",
    frequency: "PRN",
    maxDose: "2000 mg",
    calculate: (w) => {
      const dose = Math.min(w * 50, 2000);
      return `${(w * 25).toFixed(0)} – ${dose.toFixed(0)} mg IV`;
    },
  },

  // IV Fluids
  {
    name: "Maintenance IVF (Holliday-Segar)",
    category: "IV Fluids",
    dosePerKg: "4-2-1 rule",
    unit: "mL/hr",
    route: "IV",
    frequency: "Continuous",
    notes: "First 10kg: 4mL/kg/hr, Next 10kg: 2mL/kg/hr, Each kg after: 1mL/kg/hr",
    calculate: (w) => {
      let rate = 0;
      if (w <= 10) rate = w * 4;
      else if (w <= 20) rate = 40 + (w - 10) * 2;
      else rate = 40 + 20 + (w - 20) * 1;
      return `${rate.toFixed(0)} mL/hr`;
    },
  },
  {
    name: "NS Bolus (Resuscitation)",
    category: "IV Fluids",
    dosePerKg: "10–20 mL/kg",
    unit: "mL",
    route: "IV push",
    frequency: "PRN",
    notes: "Give over 5-20 min; reassess after each bolus",
    calculate: (w) => `${(w * 10).toFixed(0)} – ${(w * 20).toFixed(0)} mL`,
  },
  {
    name: "D10W Bolus (Hypoglycemia)",
    category: "IV Fluids",
    dosePerKg: "2–5 mL/kg",
    unit: "mL",
    route: "IV",
    frequency: "PRN",
    notes: "Check glucose 15 min after",
    calculate: (w) => `${(w * 2).toFixed(0)} – ${(w * 5).toFixed(0)} mL IV`,
  },
  {
    name: "3% Hypertonic Saline",
    category: "IV Fluids",
    dosePerKg: "2–5 mL/kg",
    unit: "mL",
    route: "IV over 10-20 min",
    frequency: "PRN",
    notes: "For symptomatic hyponatremia or raised ICP",
    calculate: (w) => `${(w * 2).toFixed(0)} – ${(w * 5).toFixed(0)} mL IV`,
  },

  // Blood Products
  {
    name: "Packed RBCs (pRBC)",
    category: "Blood Products",
    dosePerKg: "10–15 mL/kg",
    unit: "mL",
    route: "IV",
    frequency: "Over 2-4 hr",
    notes: "Expected Hgb rise: ~1 g/dL per 10 mL/kg",
    calculate: (w) => `${(w * 10).toFixed(0)} – ${(w * 15).toFixed(0)} mL`,
  },
  {
    name: "Fresh Frozen Plasma (FFP)",
    category: "Blood Products",
    dosePerKg: "10–15 mL/kg",
    unit: "mL",
    route: "IV",
    frequency: "PRN",
    calculate: (w) => `${(w * 10).toFixed(0)} – ${(w * 15).toFixed(0)} mL`,
  },
  {
    name: "Platelets",
    category: "Blood Products",
    dosePerKg: "5–10 mL/kg",
    unit: "mL",
    route: "IV",
    frequency: "Over 30-60 min",
    notes: "Expected rise: 30-50K per unit",
    calculate: (w) => `${(w * 5).toFixed(0)} – ${(w * 10).toFixed(0)} mL`,
  },
  {
    name: "Cryoprecipitate",
    category: "Blood Products",
    dosePerKg: "1–2 units/10kg",
    unit: "units",
    route: "IV",
    frequency: "PRN",
    notes: "For fibrinogen < 100 mg/dL",
    calculate: (w) => `${Math.max(1, Math.round(w / 10))} – ${Math.max(1, Math.round(w / 5))} units`,
  },
  {
    name: "Albumin 5%",
    category: "Blood Products",
    dosePerKg: "10–20 mL/kg",
    unit: "mL",
    route: "IV",
    frequency: "Over 1-2 hr",
    calculate: (w) => `${(w * 10).toFixed(0)} – ${(w * 20).toFixed(0)} mL`,
  },

  // Anticonvulsants
  {
    name: "Phenytoin (Loading)",
    category: "Anticonvulsants",
    dosePerKg: "15–20 mg/kg",
    unit: "mg",
    route: "IV",
    frequency: "Once",
    maxDose: "1500 mg",
    notes: "Give at max 1 mg/kg/min; cardiac monitoring required",
    calculate: (w) => {
      const dose = Math.min(w * 20, 1500);
      return `${(w * 15).toFixed(0)} – ${dose.toFixed(0)} mg IV`;
    },
  },
  {
    name: "Levetiracetam (Loading)",
    category: "Anticonvulsants",
    dosePerKg: "20–60 mg/kg",
    unit: "mg",
    route: "IV over 15 min",
    frequency: "Once",
    maxDose: "4500 mg",
    calculate: (w) => {
      const dose = Math.min(w * 60, 4500);
      return `${(w * 20).toFixed(0)} – ${dose.toFixed(0)} mg IV`;
    },
  },
  {
    name: "Midazolam (Seizure)",
    category: "Anticonvulsants",
    dosePerKg: "0.1–0.2 mg/kg",
    unit: "mg",
    route: "IV/IM/IN",
    frequency: "PRN",
    maxDose: "10 mg",
    calculate: (w) => `${(w * 0.1).toFixed(2)} – ${(w * 0.2).toFixed(2)} mg`,
  },

  // Resuscitation
  {
    name: "Epinephrine (Code)",
    category: "Resuscitation",
    dosePerKg: "0.01 mg/kg (1:10,000)",
    unit: "mg",
    route: "IV/IO",
    frequency: "Q3-5 min",
    maxDose: "1 mg",
    notes: "0.1 mL/kg of 1:10,000 solution",
    calculate: (w) => {
      const dose = Math.min(w * 0.01, 1);
      return `${dose.toFixed(3)} mg (${(dose * 10).toFixed(2)} mL of 1:10,000) IV/IO`;
    },
  },
  {
    name: "Amiodarone (VF/pVT)",
    category: "Resuscitation",
    dosePerKg: "5 mg/kg",
    unit: "mg",
    route: "IV/IO",
    frequency: "Max 3 doses",
    maxDose: "300 mg",
    calculate: (w) => {
      const dose = Math.min(w * 5, 300);
      return `${dose.toFixed(0)} mg IV/IO`;
    },
  },
  {
    name: "Adenosine (1st dose)",
    category: "Resuscitation",
    dosePerKg: "0.1 mg/kg",
    unit: "mg",
    route: "Rapid IV push",
    frequency: "May repeat at 0.2 mg/kg",
    maxDose: "6 mg (1st), 12 mg (2nd)",
    notes: "Rapid push followed by NS flush",
    calculate: (w) => {
      const d1 = Math.min(w * 0.1, 6);
      const d2 = Math.min(w * 0.2, 12);
      return `1st: ${d1.toFixed(2)} mg, 2nd: ${d2.toFixed(2)} mg`;
    },
  },
  {
    name: "Atropine",
    category: "Resuscitation",
    dosePerKg: "0.02 mg/kg",
    unit: "mg",
    route: "IV/IO",
    frequency: "May repeat once",
    maxDose: "0.5 mg",
    notes: "Min dose 0.1 mg",
    calculate: (w) => {
      const dose = Math.max(0.1, Math.min(w * 0.02, 0.5));
      return `${dose.toFixed(2)} mg IV/IO`;
    },
  },
  {
    name: "Defibrillation",
    category: "Resuscitation",
    dosePerKg: "2–4 J/kg",
    unit: "J",
    route: "External",
    frequency: "As needed",
    notes: "Start at 2 J/kg, increase to 4 J/kg",
    calculate: (w) => `${(w * 2).toFixed(0)} – ${(w * 4).toFixed(0)} J`,
  },
  {
    name: "ETT Size (Uncuffed)",
    category: "Resuscitation",
    dosePerKg: "Age-based",
    unit: "mm",
    route: "Airway",
    frequency: "N/A",
    notes: "(Age/4) + 4 for uncuffed; (Age/4) + 3.5 for cuffed",
    calculate: () => `Use age-based formula`,
  },
];
