// src/App.tsx
import React from 'react';
import '../index.css';
import WorkoutInput from '../components/WorkoutInput';
import WorkoutList from '../components/WorkoutList';
import { useWorkouts } from '../hooks/useWorkouts';
import GoalTracker from '../components/GoalTracker'

const GoalTrackerPage: React.FC = () => {
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
          <GoalTracker />
        </div>
  
      </div>
    </div>
  );
};

export default GoalTrackerPage;
