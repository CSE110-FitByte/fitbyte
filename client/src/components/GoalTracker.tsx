import React, { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import { Goal } from '../types/types';

const GoalTracker: React.FC = () => {
  const { goals, addGoal, deleteGoal, completeGoal } = useGoals();
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');

  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: new Date().toISOString(),
      title: goalTitle,
      isCompleted: false,
    };
    addGoal(newGoal);
    setGoalTitle('');
    setGoalDescription('');
  };

  const handleCompleteGoal = (id: string) => {
    completeGoal(id);
  };

  const handleDeleteGoal = (id: string) => {
    deleteGoal(id);
  };

  return (
    <div>
      <h2>Goal Tracker</h2>
      <div>
        <input
          type="text"
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
          placeholder="Goal title"
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>

      <ul>
        {goals.map((goal) => (
          <li key={goal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Checkbox to complete goal */}
              <input
                type="checkbox"
                checked={goal.isCompleted}
                onChange={() => handleCompleteGoal(goal.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ textDecoration: goal.isCompleted ? 'line-through' : 'none' }}>
                {goal.title}
              </span>
            </div>

            {/* Delete button (X) */}
            <button
              onClick={() => handleDeleteGoal(goal.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalTracker;