import { API_BASE_URL } from "../constants/constants";
import { Workout, Exercise } from "../types/types";

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
	let workoutList = response.json().then((jsonResponse) => {
    	console.log("data in fetchWorkouts", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchWorkouts", workoutList);
	return workoutList;
};