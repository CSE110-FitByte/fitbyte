// src/App.tsx
import React from 'react';
import './index.css';
import WorkoutInput from './components/WorkoutInput';
import WorkoutList from './components/WorkoutList';
import { useWorkouts } from './hooks/useWorkouts';
import GoalTracker from './components/GoalTracker'

const App: React.FC = () => {
  const {
    workoutName,
    setWorkoutName,
    exerciseName,
    setExerciseName,
    exerciseType,
    setExerciseType,
    sets,
    setSets,
    weight,
    setWeight,
    reps,
    setReps,
    speed,
    setSpeed,
    distance,
    setDistance,
    duration,
    setDuration,
    intensity,
    setIntensity,
    currentExercises,
    addExercise,
    deleteExercise,
    workouts,
    addWorkout,
    //saveWorkouts,
    deleteWorkout,
    
  } = useWorkouts();

  return (
    <div>
      {/* Top Header Section */}
      <header>
        <h1>Workout Planner</h1>
      </header>
  
      {/* Main Content */}
      <div className="main-container">
        {/* Left Column */}
        <div className="left-column">
          <WorkoutInput
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
            exerciseName={exerciseName}
            setExerciseName={setExerciseName}
            exerciseType={exerciseType}
            setExerciseType={setExerciseType}
            sets={sets}
            setSets={setSets}
            reps={reps}
            setReps={setReps}
            weight={weight}
            setWeight={setWeight}
            distance={distance}
            setDistance={setDistance}
            duration={duration}
            setDuration={setDuration}
            speed={speed}
            setSpeed={setSpeed}
            intensity={intensity}
            setIntensity={setIntensity}
            addExercise={addExercise}
            deleteExercise={deleteExercise}
            currentExercises={currentExercises}
            addWorkout={addWorkout}
            deleteWorkout={deleteWorkout}
          />
          <GoalTracker />
        </div>
  
        {/* Center Column */}
        <div className="center-column">
          <WorkoutList workouts={workouts} deleteWorkout={deleteWorkout} />
        </div>
      </div>
    </div>
  );
};

export default App;
