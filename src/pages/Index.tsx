import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Coffee, Sandwich, Apple, UtensilsCrossed, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WorkoutPlanTable } from "@/components/WorkoutPlanTable";
import { NutritionPlanTable } from "@/components/NutritionPlanTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Load data from localStorage or use defaults
  const [workoutPlans, setWorkoutPlans] = useState(() => {
    const saved = localStorage.getItem("workoutPlans");
    return saved ? JSON.parse(saved) : {
      0: [], // Sunday - Rest
      1: ["Chest: Bench Press 4x8", "Chest: Incline Dumbbell Press 3x10", "Triceps: Dips 3x12", "Triceps: Cable Pushdowns 3x15"],
      2: ["Back: Pull-ups 4x8", "Back: Bent Over Rows 4x10", "Biceps: Barbell Curls 3x12", "Biceps: Hammer Curls 3x12"],
      3: ["Legs: Squats 4x8", "Legs: Leg Press 3x12", "Legs: Lunges 3x10 each", "Calves: Calf Raises 4x15"],
      4: ["Shoulders: Military Press 4x8", "Shoulders: Lateral Raises 3x12", "Shoulders: Rear Delt Flyes 3x12", "Abs: Planks 3x60s"],
      5: ["Arms: Close-grip Bench 3x10", "Arms: Preacher Curls 3x12", "Arms: Overhead Extension 3x12", "Abs: Crunches 3x20"],
      6: [], // Saturday - Rest
    };
  });

  const [dietPlans, setDietPlans] = useState(() => {
    const saved = localStorage.getItem("dietPlans");
    if (saved) return JSON.parse(saved);
    
    // Default meal plan for all days
    const defaultMeals = {
      breakfast: ["Oatmeal with banana and honey", "2 boiled eggs", "Green tea"],
      lunch: ["Grilled chicken breast (200g)", "Brown rice (1 cup)", "Mixed vegetables", "Side salad"],
      snacks: ["Greek yogurt with berries", "Handful of almonds", "Protein shake"],
      dinner: ["Baked salmon (150g)", "Sweet potato", "Steamed broccoli", "Quinoa salad"],
    };
    
    // Create weekly structure
    return {
      0: { ...defaultMeals },
      1: { ...defaultMeals },
      2: { ...defaultMeals },
      3: { ...defaultMeals },
      4: { ...defaultMeals },
      5: { ...defaultMeals },
      6: { ...defaultMeals },
    };
  });

  // Save to localStorage whenever plans change
  useEffect(() => {
    localStorage.setItem("workoutPlans", JSON.stringify(workoutPlans));
  }, [workoutPlans]);

  useEffect(() => {
    localStorage.setItem("dietPlans", JSON.stringify(dietPlans));
  }, [dietPlans]);

  const handleWorkoutPlansUpdate = (plans: Record<number, string[]>) => {
    setWorkoutPlans(plans);
  };

  const handleDietPlansUpdate = (plans: Record<number, any>) => {
    setDietPlans(plans);
  };

  const todayWorkouts = workoutPlans[currentDay as keyof typeof workoutPlans] || [];
  const todayMeals = dietPlans[currentDay] || { breakfast: [], lunch: [], snacks: [], dinner: [] };

  const getMealIcon = (mealType: string) => {
    switch(mealType) {
      case 'breakfast': return Coffee;
      case 'lunch': return Sandwich;
      case 'snacks': return Apple;
      case 'dinner': return UtensilsCrossed;
      default: return UtensilsCrossed;
    }
  };

  return (
    <div className="min-h-screen bg-background">      
      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-foreground">
          Dashboard
        </h1>

        {/* Workout Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Workout</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                  See All
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                <WorkoutPlanTable 
                  workoutPlans={workoutPlans}
                  onUpdate={handleWorkoutPlansUpdate}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-2">
            {todayWorkouts.length > 0 ? (
              todayWorkouts.slice(0, 4).map((exercise, index) => {
                const parts = exercise.split(':');
                const name = parts.length > 1 ? parts[1].trim().split(/\d+x/)[0].trim() : exercise.split(/\d+x/)[0].trim();
                const sets = exercise.match(/(\d+x\d+)/)?.[0] || '';
                
                return (
                  <div key={index} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{sets}</span>
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-muted-foreground py-2">Rest day</div>
            )}
          </div>
        </div>

        {/* Meals Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Meals</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                  See All
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                <NutritionPlanTable 
                  dietPlans={dietPlans}
                  onUpdate={handleDietPlansUpdate}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-2">
            {Object.entries(todayMeals).map(([mealType, items]: [string, any]) => {
              const Icon = getMealIcon(mealType);
              const mealTimes: Record<string, string> = {
                breakfast: '8:00 AM',
                lunch: '12:30 PM',
                snacks: '3:00 PM',
                dinner: '6:45 PM'
              };
              const calories = Array.isArray(items) ? `${items.length * 15}gc` : '0gc';
              
              return (
                <div key={mealType} className="py-1.5 border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground capitalize">{mealType}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{calories}</span>
                  </div>
                  <div className="text-xs text-muted-foreground ml-5.5 mt-0.5">
                    {mealTimes[mealType]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
