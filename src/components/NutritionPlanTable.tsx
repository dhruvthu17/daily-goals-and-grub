import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Coffee, Sandwich, Apple, UtensilsCrossed } from "lucide-react";

interface NutritionPlanTableProps {
  dietPlans: Record<number, {
    breakfast: string[];
    lunch: string[];
    snacks: string[];
    dinner: string[];
  }>;
  onUpdate: (plans: any) => void;
}

export const NutritionPlanTable = ({ dietPlans, onUpdate }: NutritionPlanTableProps) => {
  const { toast } = useToast();
  const [editedPlans, setEditedPlans] = useState<Record<number, Record<string, string>>>(
    Object.fromEntries(
      Object.entries(dietPlans).map(([day, meals]) => [
        day,
        {
          breakfast: meals.breakfast.join("\n"),
          lunch: meals.lunch.join("\n"),
          snacks: meals.snacks.join("\n"),
          dinner: meals.dinner.join("\n"),
        }
      ])
    )
  );

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const meals = [
    { key: "breakfast", title: "Breakfast", icon: Coffee },
    { key: "lunch", title: "Lunch", icon: Sandwich },
    { key: "snacks", title: "Snacks", icon: Apple },
    { key: "dinner", title: "Dinner", icon: UtensilsCrossed },
  ];

  const handleSave = () => {
    const newPlans = Object.fromEntries(
      Object.entries(editedPlans).map(([day, mealTexts]) => [
        day,
        Object.fromEntries(
          Object.entries(mealTexts).map(([meal, text]) => [
            meal,
            text.split("\n").map(i => i.trim()).filter(i => i.length > 0)
          ])
        )
      ])
    );
    onUpdate(newPlans);
    toast({
      title: "Nutrition Plan Saved",
      description: "Your weekly nutrition plan has been updated.",
    });
  };

  const updateMeal = (dayIndex: number, mealKey: string, value: string) => {
    setEditedPlans(prev => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        [mealKey]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {days.map((day, dayIndex) => (
        <div key={dayIndex} className="glass rounded-xl p-4 md:p-6 space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-foreground">{day}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((meal) => {
              const Icon = meal.icon;
              return (
                <div key={meal.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-foreground" />
                    <h4 className="font-semibold text-sm text-foreground">{meal.title}</h4>
                  </div>
                  <Textarea
                    value={editedPlans[dayIndex]?.[meal.key] || ""}
                    onChange={(e) => updateMeal(dayIndex, meal.key, e.target.value)}
                    placeholder="Enter food items, one per line&#10;Example:&#10;Grilled chicken breast (200g)&#10;Brown rice (1 cup)"
                    className="glass min-h-[150px] font-mono text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex justify-end sticky bottom-4">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground shadow-lg">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
