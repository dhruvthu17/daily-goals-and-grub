import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MealCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  gradient?: string;
}

export const MealCard = ({ title, items, icon: Icon, gradient = "from-primary to-primary/80" }: MealCardProps) => {
  return (
    <Card className="p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
          <Icon className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="font-semibold text-card-foreground">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-primary text-xs mt-1">▪</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
