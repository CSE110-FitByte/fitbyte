/* Interface for Workout */
export interface Workout {
  //Required fields
  id: number; 
  workoutName: string; 
}


/* Interface for Strength Exercises */
export interface ExerciseStrengthDB {
  //Required fields
  id: number;
  workoutId: number;
  exerciseName: string;

  //Optional fields
  setCount?: number | null;
  weightCount?: number | null;
  repCount?: number | null;
}

/* Interface for Cardio Exercises */
export interface ExerciseCardioDB {
  //Required fields
  id: number; 
  workoutId: number; 
  exerciseName: string; 

  //Optional fields
  distance?: number | null; 
  durationMin?: number | null; 
  speedMilesPerHour?: number | null; 
}

/* Interface for Mind/Body Exercises */
export interface ExerciseOtherDB {
  //Required fields
  id: number; 
  workoutId: number; 
  exerciseName: string; 
  durationMin: number; 

  //Optional fields
  intensityLevel?: string | null;               //can be null or undefined
}