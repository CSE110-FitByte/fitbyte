// src/App.tsx
import React from 'react';
import './index.css';
import WorkoutInput from './components/WorkoutInput';
import WorkoutList from './components/WorkoutList';
import { useWorkouts } from './hooks/useWorkouts';
import GoalTracker from './components/GoalTracker'
import WorkoutsPage from './pages/WorkoutsPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GoalTrackerPage from './pages/GoalTrackerPage';


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
    saveWorkouts,
    deleteWorkout,

  } = useWorkouts();

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand mb-0 h1" >FitByte</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Workouts">Workouts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/GoalTracker">Goals</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Workouts" element={<WorkoutsPage />} />
          <Route path="/GoalTracker" element={<GoalTrackerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
