import { API_BASE_URL } from "../constants/constants";
import { Workout, Exercise } from "../types/types";

export const parseWorkoutList = (workouts: any[]): Workout[] => {
    const workoutMap: { [key: number]: Workout } = {};
  
    workouts.forEach((workout) => {
      const workoutId = workout.id;
      const workoutName = workout.workout_name;
  
      // Initialize the workout in the map if not already present
      if (!workoutMap[workoutId]) {
        workoutMap[workoutId] = {
          name: workoutName,
          exercises: [],
        };
      }
  
      // If there's an exercise associated with this workout, add it
      if (workout.exercise_name) {
        const exercise: Exercise = {
          name: workout.exercise_name,
          exerciseType: workout.exercise_type,
  
          // Strength Training
          sets: workout.sets ?? null,
          weight: workout.weight ?? null,
          reps: workout.reps ?? null,
  
          // Cardio
          speed: workout.speed ?? null,
          distance: workout.distance ?? null,
          duration: workout.duration ?? null,
  
          // Mind-Body
          intensity: workout.intensity ?? null,
        };
  
        workoutMap[workoutId].exercises.push(exercise);
      }
    });

    // Convert the workout map to an array
    return Object.values(workoutMap);
};

// Function to create an workout in the backend. Method: POST
export const createWorkout = async (workout: Workout): Promise<Workout> => {

	const response = await fetch(`${API_BASE_URL}/workouts`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(workout),
	});
	if (!response.ok) {
    	throw new Error("Failed to create workout");
	}
	return response.json();
};

// Function to delete an workout in the backend. Method: DELETE
export const deleteWorkout = async (id: string): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
    	method: "DELETE",
	});
	if (!response.ok) {
    	throw new Error("Failed to delete workout");
	}
};

// Function to get all workouts from the backend. Method: GET
export const fetchWorkouts = async (): Promise<Workout[]> => {
	const response = await fetch(`${API_BASE_URL}/workouts`);
	if (!response.ok) {
    	throw new Error('Failed to fetch workouts');
	}

	// Parsing the response to get the data
	let workoutList = await response.json().then((jsonResponse) => {
    	console.log("data in fetchWorkouts", jsonResponse);
    	return jsonResponse.data;
	});

    // Parse the response workoutList to get the data into Workout[] format
    const parsedWorkoutList = parseWorkoutList(workoutList);

	console.log("response in fetchWorkouts", parsedWorkoutList);
	return parsedWorkoutList;
};