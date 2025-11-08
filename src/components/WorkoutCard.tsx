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
    <Card className="glass p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Dumbbell className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-card-foreground">Today's Workout</h2>
        </div>
        <EditWorkoutDialog day={day} exercises={exercises} onSave={onEdit} />
      </div>
      {exercises.length > 0 ? (
        <ul className="space-y-2">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="text-foreground font-semibold mt-0.5">•</span>
              <span>{exercise}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">Rest day - Recovery is important!</p>
      )}
    </Card>
  );
};
