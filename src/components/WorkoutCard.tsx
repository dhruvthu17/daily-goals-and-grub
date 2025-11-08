import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

interface WorkoutCardProps {
  exercises: string[];
}

export const WorkoutCard = ({ exercises }: WorkoutCardProps) => {
  return (
    <Card className="p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
          <Dumbbell className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-card-foreground">Today's Workout</h2>
      </div>
      {exercises.length > 0 ? (
        <ul className="space-y-2">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="text-primary font-semibold mt-0.5">•</span>
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
