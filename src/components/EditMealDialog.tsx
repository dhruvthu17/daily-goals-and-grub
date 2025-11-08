import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2 } from "lucide-react";

interface EditMealDialogProps {
  mealType: string;
  items: string[];
  onSave: (mealType: string, items: string[]) => void;
}

export const EditMealDialog = ({ mealType, items, onSave }: EditMealDialogProps) => {
  const [open, setOpen] = useState(false);
  const [editedItems, setEditedItems] = useState(items.join("\n"));

  const handleSave = () => {
    const itemList = editedItems
      .split("\n")
      .map(i => i.trim())
      .filter(i => i.length > 0);
    onSave(mealType, itemList);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="glass h-7 w-7">
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {mealType}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={editedItems}
            onChange={(e) => setEditedItems(e.target.value)}
            placeholder="Enter food items, one per line&#10;Example:&#10;Grilled chicken breast (200g)&#10;Brown rice (1 cup)"
            className="glass min-h-[200px] font-mono text-sm"
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
