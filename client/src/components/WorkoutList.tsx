import React from 'react';
import { Workout } from '../types/types';

interface WorkoutListProps {
  workouts: Workout[];
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => (
  <div>
    <h2>Workout List</h2>
    {workouts.map((workout, index) => (
      <div key={index} style={{ marginBottom: '20px' }}>
        <h3>{workout.name}</h3>
        <ul>
          {workout.exercises.map((exercise, idx) => (
            <li key={idx}>{exercise.name}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default WorkoutList;
