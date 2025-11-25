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
    <Card className="glass p-3 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary">
            <Icon className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-sm text-card-foreground">{title}</h3>
        </div>
        <EditMealDialog mealType={title} items={items} onSave={onEdit} />
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
            <span className="text-foreground text-xs mt-0.5">▪</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
