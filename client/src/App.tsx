// src/App.tsx

import React from 'react';
import WorkoutInput from './components/WorkoutInput';
import WorkoutList from './components/WorkoutList';
import SaveWorkoutsButton from './components/SaveWorkoutsButton';
import { useWorkouts } from './hooks/useWorkouts';

const App: React.FC = () => {
  const {
    workoutName,
    setWorkoutName,
    exerciseName,
    setExerciseName,
    currentExercises,
    addExercise,
    workouts,
    addWorkout,
    saveWorkouts,
  } = useWorkouts();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Workout Planner</h1>
      <WorkoutInput
        workoutName={workoutName}
        setWorkoutName={setWorkoutName}
        exerciseName={exerciseName}
        setExerciseName={setExerciseName}
        addExercise={addExercise}
        currentExercises={currentExercises}
        addWorkout={addWorkout}
      />
      <WorkoutList workouts={workouts} />
      <SaveWorkoutsButton saveWorkouts={saveWorkouts} />
    </div>
  );
};

export default App;
