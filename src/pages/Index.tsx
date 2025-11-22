import { useState, useEffect } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import { MealCard } from "@/components/MealCard";
import { WorkoutPlanTable } from "@/components/WorkoutPlanTable";
import { NutritionPlanTable } from "@/components/NutritionPlanTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Coffee, Sandwich, Apple, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleWorkoutEdit = (day: number, exercises: string[]) => {
    setWorkoutPlans(prev => ({ ...prev, [day]: exercises }));
    toast({
      title: "Workout Updated",
      description: "Your workout plan has been saved.",
    });
  };

  const handleWorkoutPlansUpdate = (plans: Record<number, string[]>) => {
    setWorkoutPlans(plans);
  };

  const handleMealEdit = (mealType: string, items: string[]) => {
    const key = mealType.toLowerCase();
    setDietPlans(prev => ({ 
      ...prev, 
      [currentDay]: { 
        ...prev[currentDay as keyof typeof prev], 
        [key]: items 
      } 
    }));
    toast({
      title: "Meal Updated",
      description: `Your ${mealType.toLowerCase()} plan has been saved.`,
    });
  };

  const handleDietPlansUpdate = (plans: Record<number, any>) => {
    setDietPlans(plans);
  };

  const nextDay = () => {
    setCurrentDay((prev) => (prev + 1) % 7);
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + 7) % 7);
  };

  const isToday = currentDay === new Date().getDay();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">      
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-5xl md:text-7xl font-bold mb-3 text-foreground">
            workout
          </h1>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="glass grid w-full grid-cols-3 mb-8 p-1.5 h-auto gap-1">
            <TabsTrigger value="daily" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3">Daily View</TabsTrigger>
            <TabsTrigger value="workout" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3">Workout Plan</TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3">Nutrition Plan</TabsTrigger>
          </TabsList>

          {/* Daily View Tab */}
          <TabsContent value="daily" className="space-y-6 md:space-y-8">
            {/* Day Navigation */}
            <div className="flex items-center justify-between glass rounded-2xl p-3 md:p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevDay}
                className="bg-background hover:bg-accent h-9 w-9 md:h-10 md:w-10"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
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
                variant="outline"
                size="icon"
                onClick={nextDay}
                className="bg-background hover:bg-accent h-9 w-9 md:h-10 md:w-10"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </Button>
            </div>

            {/* Workout Section */}
            <div>
              <WorkoutCard 
                day={currentDay}
                exercises={workoutPlans[currentDay as keyof typeof workoutPlans]} 
                onEdit={handleWorkoutEdit}
              />
            </div>

            {/* Meals Section */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6" />
                Today's Nutrition
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <MealCard
                  title="Breakfast"
                  items={dietPlans[currentDay]?.breakfast || []}
                  icon={Coffee}
                  onEdit={handleMealEdit}
                />
                <MealCard
                  title="Lunch"
                  items={dietPlans[currentDay]?.lunch || []}
                  icon={Sandwich}
                  onEdit={handleMealEdit}
                />
                <MealCard
                  title="Snacks"
                  items={dietPlans[currentDay]?.snacks || []}
                  icon={Apple}
                  onEdit={handleMealEdit}
                />
                <MealCard
                  title="Dinner"
                  items={dietPlans[currentDay]?.dinner || []}
                  icon={UtensilsCrossed}
                  onEdit={handleMealEdit}
                />
              </div>
            </div>
          </TabsContent>

          {/* Workout Plan Tab */}
          <TabsContent value="workout">
            <WorkoutPlanTable 
              workoutPlans={workoutPlans}
              onUpdate={handleWorkoutPlansUpdate}
            />
          </TabsContent>

          {/* Nutrition Plan Tab */}
          <TabsContent value="nutrition">
            <NutritionPlanTable 
              dietPlans={dietPlans}
              onUpdate={handleDietPlansUpdate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
