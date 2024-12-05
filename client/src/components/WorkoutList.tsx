import React from 'react';
import { Workout } from '../types/types';

interface WorkoutListProps {
  workouts: Workout[];
  deleteWorkout: (index: number) => void;
  addWorkout: (newWorkout: Workout) => void;
}

const suggestedWorkouts: Workout[] = [
  {
    name: "Full Body Blast",
    exercises: [
      { name: "Push-Up", exerciseType: "strength", sets: 3, reps: 15, weight: 0 },
      { name: "Squats", exerciseType: "strength", sets: 3, reps: 12, weight: 0 },
      { name: "Burpees", exerciseType: "cardio", duration: 5, distance: 0, speed: 0 },
    ],
  },
  {
    name: "Cardio Burner",
    exercises: [
      { name: "Running", exerciseType: "cardio", duration: 20, distance: 2, speed: 6 },
      { name: "Jump Rope", exerciseType: "cardio", duration: 10, distance: 0, speed: 0 },
    ],
  },
  {
    name: "Upper Body Strength",
    exercises: [
      { name: "Bench Press", exerciseType: "strength", sets: 4, reps: 10, weight: 135 },
      { name: "Pull-Ups", exerciseType: "strength", sets: 3, reps: 8, weight: 0 },
      { name: "Shoulder Press", exerciseType: "strength", sets: 3, reps: 12, weight: 45 },
    ],
  },
];



const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, deleteWorkout, addWorkout }) => (
  <div>
    <h2>Workout List</h2>
    {workouts.length === 0 ? (
      <>
        <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
          No workouts created yet. Click "Create Workout" or choose a suggested workout below to get started!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {suggestedWorkouts.map((workout, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                width: '200px',
              }}
            >
              <h4>{workout.name}</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {workout.exercises.map((exercise, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: '#555' }}>
                    {exercise.name}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addWorkout(workout)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                + Add Workout
              </button>
            </div>
          ))}
        </div>
      </>
    ) : (
      workouts.map((workout, index) => (
        <div key={index} className="workout-box">
          <div className="workout-header">
            <h3>{workout.name}</h3>
            <button className="delete-button" onClick={() => deleteWorkout(index)}>
              x
            </button>
          </div>

          {/* Grouped Exercises */}
          {['strength', 'cardio', 'mindbody'].map((type) => {
            const filteredExercises = workout?.exercises?.filter(
              (exercise) => exercise.exerciseType === type
            ) || [];
            if (filteredExercises.length === 0) return null;

            return (
              <div key={type}>
                <h4>
                  {type === 'strength'
                    ? 'Strength Training'
                    : type === 'cardio'
                    ? 'Cardio'
                    : 'Mind/Body'}
                </h4>
                <ul>
                  {filteredExercises.map((exercise, idx) => (
                    <li key={idx}>
                      {exercise.name}
                      <br />
                      {(() => {
                      if (type === 'strength') {
                        const details = [];
                        if (exercise.sets && exercise.sets > 0) details.push(`${exercise.sets} sets`);
                        if (exercise.reps && exercise.reps > 0) details.push(`${exercise.reps} reps`);
                        if (exercise.weight && exercise.weight > 0) details.push(`${exercise.weight} lbs`);
                        return details.length > 0 ? details.join(', ') : null; // Only render if there are valid details
                      } else if (type === 'cardio') {
                        const details = [];
                        if (exercise.distance && exercise.distance > 0) details.push(`${exercise.distance} mi`);
                        if (exercise.duration && exercise.duration > 0) details.push(`${exercise.duration} min`);
                        if (exercise.speed && exercise.speed > 0) details.push(`${exercise.speed} mph`);
                        return details.length > 0 ? details.join(', ') : null; // Only render if there are valid details
                      } else if (type === 'mindbody') {
                        const details = [];
                        if (exercise.duration && exercise.duration > 0) details.push(`${exercise.duration} min`);
                        if (exercise.intensity && exercise.intensity !== 'n/a') details.push(`${exercise.intensity} intensity`);
                        return details.length > 0 ? details.join(', ') : null; // Only render if there are valid details
                      }
                    })()}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))
    )}
  </div>
);

export default WorkoutList;