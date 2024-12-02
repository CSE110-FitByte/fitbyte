// src/App.tsx
import React from 'react';
import './index.css';
import WorkoutInput from './components/WorkoutInput';
import WorkoutList from './components/WorkoutList';
import { useWorkouts } from './hooks/useWorkouts';
import GoalTracker from './components/GoalTracker'
import WorkoutsPage from './pages/WorkoutsPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'sticky', top: 0, zIndex: 1000}}>
          <a className="navbar-brand mb-0 h1">FitByte</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Workouts">Workouts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/GoalTracker">Goals</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Workouts" component={WorkoutsPage} />
          <Route exact path="/GoalTracker" component={GoalTrackerPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
