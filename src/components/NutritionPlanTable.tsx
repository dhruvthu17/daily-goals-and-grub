import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Coffee, Sandwich, Apple, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [editedPlans, setEditedPlans] = useState<Record<number, Record<string, string>>>(() => {
    const plans: Record<number, Record<string, string>> = {};
    
    for (let day = 0; day < 7; day++) {
      const dayMeals = dietPlans[day] || { breakfast: [], lunch: [], snacks: [], dinner: [] };
      plans[day] = {
        breakfast: (dayMeals.breakfast || []).join("\n"),
        lunch: (dayMeals.lunch || []).join("\n"),
        snacks: (dayMeals.snacks || []).join("\n"),
        dinner: (dayMeals.dinner || []).join("\n"),
      };
    }
    
    return plans;
  });

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

  const nextDay = () => {
    setCurrentDay((prev) => (prev + 1) % 7);
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + 7) % 7);
  };

  const isToday = currentDay === new Date().getDay();

  return (
    <div className="space-y-6">
      {/* Day Navigation */}
      <div className="flex items-center justify-between glass rounded-2xl p-3 md:p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevDay}
          className="hover:bg-foreground/5 h-9 w-9 md:h-10 md:w-10"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{days[currentDay]}</h2>
          {isToday && (
            <span className="inline-block mt-1 px-2 md:px-3 py-0.5 md:py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              Today
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextDay}
          className="hover:bg-foreground/5 h-9 w-9 md:h-10 md:w-10"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>

      {/* Current Day's Meals */}
      <div className="glass rounded-xl p-4 md:p-6 space-y-4">
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
                  value={editedPlans[currentDay]?.[meal.key] || ""}
                  onChange={(e) => updateMeal(currentDay, meal.key, e.target.value)}
                  placeholder="Enter food items, one per line&#10;Example:&#10;Grilled chicken breast (200g)&#10;Brown rice (1 cup)"
                  className="glass min-h-[150px] font-serif text-sm"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end sticky bottom-4">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground shadow-lg">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
