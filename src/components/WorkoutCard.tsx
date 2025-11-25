import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { EditWorkoutDialog } from "./EditWorkoutDialog";

interface WorkoutCardProps {
  day: number;
  exercises: string[];
  onEdit: (day: number, exercises: string[]) => void;
}

export const WorkoutCard = ({ day, exercises, onEdit }: WorkoutCardProps) => {
  return (
    <Card className="glass p-3 md:p-4 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary">
            <Dumbbell className="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-card-foreground">Workout</h2>
        </div>
        <EditWorkoutDialog day={day} exercises={exercises} onSave={onEdit} />
      </div>
      {exercises.length > 0 ? (
        <ul className="space-y-1">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-muted-foreground text-sm"
            >
              <span className="text-foreground font-semibold mt-0.5">•</span>
              <span>{exercise}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm">Rest day</p>
      )}
    </Card>
  );
};
