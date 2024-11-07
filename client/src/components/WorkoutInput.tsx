import React, { ChangeEvent } from 'react';
import { Exercise } from '../types/types'

interface WorkoutInputProps {
  workoutName: string;
  setWorkoutName: (value: string) => void;
  exerciseName: string;
  setExerciseName: (value: string) => void;
  addExercise: () => void;
  currentExercises: Exercise[];
  addWorkout: () => void;
}

const WorkoutInput: React.FC<WorkoutInputProps> = ({
  workoutName,
  setWorkoutName,
  exerciseName,
  setExerciseName,
  addExercise,
  currentExercises,
  addWorkout,
}) => {
  const handleWorkoutNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.target.value);
  };

  const handleExerciseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  return (
    <div>
      <h2>Create a New Workout</h2>
      <input
        type="text"
        value={workoutName}
        onChange={handleWorkoutNameChange}
        placeholder="Workout Name"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
      />
      <h3>Add Exercises</h3>
      <input
        type="text"
        value={exerciseName}
        onChange={handleExerciseNameChange}
        placeholder="Exercise Name"
        style={{ width: '70%', padding: '8px' }}
      />
      <button onClick={addExercise} style={{ padding: '8px 16px', marginLeft: '10px' }}>
        Add Exercise
      </button>
      <ul>
        {currentExercises.map((exercise, index) => (
          <li key={index}>{exercise.name}</li>
        ))}
      </ul>
      <button onClick={addWorkout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Workout
      </button>
    </div>
  );
};

export default WorkoutInput;