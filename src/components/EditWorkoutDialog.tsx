import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2 } from "lucide-react";

interface EditWorkoutDialogProps {
  day: number;
  exercises: string[];
  onSave: (day: number, exercises: string[]) => void;
}

export const EditWorkoutDialog = ({ day, exercises, onSave }: EditWorkoutDialogProps) => {
  const [open, setOpen] = useState(false);
  const [editedExercises, setEditedExercises] = useState(exercises.join("\n"));

  const handleSave = () => {
    const exerciseList = editedExercises
      .split("\n")
      .map(e => e.trim())
      .filter(e => e.length > 0);
    onSave(day, exerciseList);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="glass h-8 w-8">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Workout</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={editedExercises}
            onChange={(e) => setEditedExercises(e.target.value)}
            placeholder="Enter exercises, one per line&#10;Example:&#10;Chest: Bench Press 4x8&#10;Triceps: Dips 3x12"
            className="glass min-h-[200px] font-serif text-sm"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)} className="glass">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
