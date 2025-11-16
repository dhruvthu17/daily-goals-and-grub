import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Coffee, Sandwich, Apple, UtensilsCrossed } from "lucide-react";

interface NutritionPlanTableProps {
  dietPlans: {
    breakfast: string[];
    lunch: string[];
    snacks: string[];
    dinner: string[];
  };
  onUpdate: (plans: any) => void;
}

export const NutritionPlanTable = ({ dietPlans, onUpdate }: NutritionPlanTableProps) => {
  const { toast } = useToast();
  const [editedPlans, setEditedPlans] = useState({
    breakfast: dietPlans.breakfast.join("\n"),
    lunch: dietPlans.lunch.join("\n"),
    snacks: dietPlans.snacks.join("\n"),
    dinner: dietPlans.dinner.join("\n"),
  });

  const meals = [
    { key: "breakfast", title: "Breakfast", icon: Coffee },
    { key: "lunch", title: "Lunch", icon: Sandwich },
    { key: "snacks", title: "Snacks", icon: Apple },
    { key: "dinner", title: "Dinner", icon: UtensilsCrossed },
  ];

  const handleSave = () => {
    const newPlans = Object.fromEntries(
      Object.entries(editedPlans).map(([meal, text]) => [
        meal,
        text.split("\n").map(i => i.trim()).filter(i => i.length > 0)
      ])
    );
    onUpdate(newPlans);
    toast({
      title: "Nutrition Plan Saved",
      description: "Your daily nutrition plan has been updated.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map((meal) => {
          const Icon = meal.icon;
          return (
            <div key={meal.key} className="glass rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-foreground" />
                <h3 className="font-semibold text-foreground">{meal.title}</h3>
              </div>
              <Textarea
                value={editedPlans[meal.key as keyof typeof editedPlans] || ""}
                onChange={(e) => setEditedPlans({ ...editedPlans, [meal.key]: e.target.value })}
                placeholder="Enter food items, one per line&#10;Example:&#10;Grilled chicken breast (200g)&#10;Brown rice (1 cup)"
                className="glass min-h-[200px] font-mono text-sm"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
