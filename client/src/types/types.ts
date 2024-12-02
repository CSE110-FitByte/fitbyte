export interface Exercise {
    name: string;
    exerciseType: string;

    //Strength Training
    sets: number;
    weight: number;
    reps: number;

    //Cardio
    speed: number;
    distance: number;
    duration: number;

    //Mind-Body
    //duration: number
    intensity: string;

    //Add more categories

  }
  
export interface Workout {
  id: number;
  name: string;
  exercises: Exercise[];
}

export type Goal = {
  id: string;
  title: string;
  isCompleted: boolean;
}