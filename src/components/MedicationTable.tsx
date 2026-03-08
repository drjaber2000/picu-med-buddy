import { Medication } from "@/data/medications";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MedicationTableProps {
  medications: Medication[];
  weight: number;
  category: string;
}

const categoryColors: Record<string, string> = {
  "Sedation & Analgesia": "bg-info/10 text-info border-info/20",
  "Inotropes & Vasopressors": "bg-destructive/10 text-destructive border-destructive/20",
  "Insulin & Electrolytes": "bg-warning/10 text-warning border-warning/20",
  "IV Fluids": "bg-secondary/10 text-secondary border-secondary/20",
  "Blood Products": "bg-destructive/10 text-destructive border-destructive/20",
  "Anticonvulsants": "bg-primary/10 text-primary border-primary/20",
  "Resuscitation": "bg-destructive/10 text-destructive border-destructive/20",
};

const MedicationTable = ({ medications, weight, category }: MedicationTableProps) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className={`px-4 py-3 font-semibold text-sm flex items-center gap-2 ${categoryColors[category] || "bg-muted text-foreground"}`}>
        <span className="inline-block w-2 h-2 rounded-full bg-current" />
        {category}
        <Badge variant="outline" className="ml-auto text-xs font-mono">
          {medications.length} meds
        </Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold w-[180px]">Medication</TableHead>
            <TableHead className="font-semibold">Dose/kg</TableHead>
            <TableHead className="font-semibold">Route</TableHead>
            <TableHead className="font-semibold">Frequency</TableHead>
            <TableHead className="font-semibold text-primary">Calculated Dose</TableHead>
            <TableHead className="font-semibold">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((med) => (
            <TableRow key={med.name} className="hover:bg-muted/30">
              <TableCell className="font-medium text-sm">{med.name}</TableCell>
              <TableCell className="text-xs font-mono">{med.dosePerKg}</TableCell>
              <TableCell className="text-xs">{med.route}</TableCell>
              <TableCell className="text-xs">{med.frequency}</TableCell>
              <TableCell className="font-semibold text-sm text-primary font-mono">
                {med.calculate(weight)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground max-w-[200px]">
                {med.maxDose && (
                  <span className="block text-destructive font-medium">Max: {med.maxDose}</span>
                )}
                {med.notes || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicationTable;
