import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface WorkoutPlanTableProps {
  workoutPlans: Record<number, string[]>;
  onUpdate: (plans: Record<number, string[]>) => void;
}

export const WorkoutPlanTable = ({ workoutPlans, onUpdate }: WorkoutPlanTableProps) => {
  const { toast } = useToast();
  const [editedPlans, setEditedPlans] = useState<Record<number, string>>(
    Object.fromEntries(
      Object.entries(workoutPlans).map(([day, exercises]) => [day, exercises.join("\n")])
    )
  );

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSave = () => {
    const newPlans = Object.fromEntries(
      Object.entries(editedPlans).map(([day, text]) => [
        day,
        text.split("\n").map(e => e.trim()).filter(e => e.length > 0)
      ])
    );
    onUpdate(newPlans);
    toast({
      title: "Workout Plans Saved",
      description: "Your weekly workout plan has been updated.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day, index) => (
          <div key={index} className="glass rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-foreground">{day}</h3>
            <Textarea
              value={editedPlans[index] || ""}
              onChange={(e) => setEditedPlans({ ...editedPlans, [index]: e.target.value })}
              placeholder="Enter exercises, one per line&#10;Example:&#10;Chest: Bench Press 4x8&#10;Triceps: Dips 3x12"
              className="glass min-h-[200px] font-serif text-sm"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
