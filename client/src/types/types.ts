export interface Exercise {
    name: string;
    sets: number;
    weight: number;
    reps: number;
    // Additional fields like reps, sets can be added here
  }
  
  export interface Workout {
    name: string;
    exercises: Exercise[];
  }