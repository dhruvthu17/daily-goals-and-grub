import { useState } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import { MealCard } from "@/components/MealCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Coffee, Sandwich, Apple, UtensilsCrossed } from "lucide-react";

const Index = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Placeholder data - replace with your actual plans
  const workoutPlans = {
    0: [], // Sunday - Rest
    1: ["Chest: Bench Press 4x8", "Chest: Incline Dumbbell Press 3x10", "Triceps: Dips 3x12", "Triceps: Cable Pushdowns 3x15"],
    2: ["Back: Pull-ups 4x8", "Back: Bent Over Rows 4x10", "Biceps: Barbell Curls 3x12", "Biceps: Hammer Curls 3x12"],
    3: ["Legs: Squats 4x8", "Legs: Leg Press 3x12", "Legs: Lunges 3x10 each", "Calves: Calf Raises 4x15"],
    4: ["Shoulders: Military Press 4x8", "Shoulders: Lateral Raises 3x12", "Shoulders: Rear Delt Flyes 3x12", "Abs: Planks 3x60s"],
    5: ["Arms: Close-grip Bench 3x10", "Arms: Preacher Curls 3x12", "Arms: Overhead Extension 3x12", "Abs: Crunches 3x20"],
    6: [], // Saturday - Rest
  };

  const dietPlans = {
    breakfast: ["Oatmeal with banana and honey", "2 boiled eggs", "Green tea"],
    lunch: ["Grilled chicken breast (200g)", "Brown rice (1 cup)", "Mixed vegetables", "Side salad"],
    snacks: ["Greek yogurt with berries", "Handful of almonds", "Protein shake"],
    dinner: ["Baked salmon (150g)", "Sweet potato", "Steamed broccoli", "Quinoa salad"],
  };

  const nextDay = () => {
    setCurrentDay((prev) => (prev + 1) % 7);
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + 7) % 7);
  };

  const isToday = currentDay === new Date().getDay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mb-2">
            Fitness Tracker
          </h1>
          <p className="text-muted-foreground">Your personalized workout and nutrition plan</p>
        </div>

        {/* Day Navigation */}
        <div className="flex items-center justify-between mb-8 bg-card rounded-xl p-4 shadow-[var(--shadow-card)]">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevDay}
            className="hover:bg-primary/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{days[currentDay]}</h2>
            {isToday && (
              <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full">
                Today
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextDay}
            className="hover:bg-primary/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Workout Section */}
        <div className="mb-8">
          <WorkoutCard exercises={workoutPlans[currentDay as keyof typeof workoutPlans]} />
        </div>

        {/* Meals Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            Today's Nutrition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MealCard
              title="Breakfast"
              items={dietPlans.breakfast}
              icon={Coffee}
              gradient="from-primary to-primary/80"
            />
            <MealCard
              title="Lunch"
              items={dietPlans.lunch}
              icon={Sandwich}
              gradient="from-accent to-accent/80"
            />
            <MealCard
              title="Snacks"
              items={dietPlans.snacks}
              icon={Apple}
              gradient="from-primary/80 to-primary/60"
            />
            <MealCard
              title="Dinner"
              items={dietPlans.dinner}
              icon={UtensilsCrossed}
              gradient="from-accent/80 to-accent/60"
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Replace the placeholder data with your actual 5-day workout and 7-day meal plans
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
