import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { EditMealDialog } from "./EditMealDialog";

interface MealCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  onEdit: (mealType: string, items: string[]) => void;
}

export const MealCard = ({ title, items, icon: Icon, onEdit }: MealCardProps) => {
  return (
    <Card className="glass p-5 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Icon className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-card-foreground">{title}</h3>
        </div>
        <EditMealDialog mealType={title} items={items} onSave={onEdit} />
      </div>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-foreground text-xs mt-1">▪</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
