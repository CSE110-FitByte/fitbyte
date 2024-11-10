import React, { ChangeEvent } from 'react';
import { Exercise } from '../types/types'

interface WorkoutInputProps {
  workoutName: string;
  setWorkoutName: (value: string) => void;
  exerciseName: string;
  setExerciseName: (value: string) => void;
  sets: number;
  setSets: (value: number) => void;
  reps: number;
  setReps: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  addExercise: () => void;
  deleteExercise: (value: number) => void;
  currentExercises: Exercise[];
  addWorkout: () => void;
}

const WorkoutInput: React.FC<WorkoutInputProps> = ({
  workoutName,
  setWorkoutName,
  exerciseName,
  setExerciseName,
  sets,
  setSets,
  reps,
  setReps,
  weight,
  setWeight,
  addExercise,
  deleteExercise,
  currentExercises,
  addWorkout,
}) => {
  const handleWorkoutNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.target.value);
  };

  const handleExerciseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleSetsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSets(Number(e.target.value));
  };

  const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReps(Number(e.target.value));
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
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

      <input
        type="number"
        value={sets}
        onChange={handleSetsChange}
        placeholder="Sets"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="1"
      />
      <label>Sets</label>
      
      <input
        type="number"
        value={reps}
        onChange={handleRepsChange}
        placeholder="Weight (lbs)"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />

      <label>Reps</label>
      
      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        placeholder="reps"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Weight (lbs)</label>
      
      <button onClick={addExercise} style={{ padding: '8px 16px', marginLeft: '10px' }}>
        Add Exercise
      </button>
      <ul>
        {currentExercises.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
            <button onClick={() => deleteExercise(index)} style={{padding: '1px 7px', marginLeft: '10px'}}>
               Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={addWorkout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Workout
      </button>
    </div>
  );
};

export default WorkoutInput;