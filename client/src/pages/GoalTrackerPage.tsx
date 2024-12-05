// src/pages/GoalTrackerPage.tsx
import React from 'react';
import '../index.css';

const GoalTrackerPage: React.FC = () => {
  return (
    <div className="goal-tracker-page">
      {/* Top Header Section */}
      <header className="goal-tracker-header">
        <h1>Goal Tracker</h1>
        <p>Set, track, and achieve your personal fitness goals!</p>
      </header>

      {/* Main Content */}
      <div className="goal-tracker-container">
        {/* Weight Goal */}
        <div className="goal-section">
          <h2>Weight Goals</h2>
          <p>Track your weight progress over time.</p>
          <div className="goal-inputs">
            <label htmlFor="currentWeight">Current Weight:</label>
            <input type="number" id="currentWeight" placeholder="Enter current weight (lbs)" />
          </div>
          <div className="goal-inputs">
            <label htmlFor="targetWeight">Target Weight:</label>
            <input type="number" id="targetWeight" placeholder="Enter target weight (lbs)" />
          </div>
          <button className="goal-button">Save Weight Goal</button>
        </div>

        {/* Step Goal */}
        <div className="goal-section">
          <h2>Daily Step Goals</h2>
          <p>Stay active by hitting your daily step goals!</p>
          <div className="goal-inputs">
            <label htmlFor="stepGoal">Step Goal:</label>
            <input type="number" id="stepGoal" placeholder="Enter daily step goal" />
          </div>
          <button className="goal-button">Save Step Goal</button>
        </div>

        {/* Water Intake Goal */}
        <div className="goal-section">
          <h2>Water Intake Goals</h2>
          <p>Keep hydrated by tracking your daily water intake.</p>
          <div className="goal-inputs">
            <label htmlFor="waterGoal">Water Goal:</label>
            <input type="number" id="waterGoal" placeholder="Enter water goal (oz)" />
          </div>
          <button className="goal-button">Save Water Goal</button>
        </div>
      </div>
    </div>
  );
};

export default GoalTrackerPage;