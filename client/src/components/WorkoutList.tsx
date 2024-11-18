import React from 'react';
import { Workout } from '../types/types';

interface WorkoutListProps {
  workouts: Workout[];
  deleteWorkout: (index: number) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, deleteWorkout }) => (
  <div>
    <h2>Workout List</h2>
    {workouts.map((workout, index) => (
      <div key={index} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <h3>{workout.name}</h3>
          <button onClick={() => deleteWorkout(index)} style={{ margin: "10px", padding: "5px 10px" }}>
            x
          </button>
        </div>
        <ul>
          {workout.exercises.map((exercise, idx) => (
            <li key={idx}>
              {exercise.name} - {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
            </li>
          ))}
        </ul>

      </div>
    ))}
  </div>
);


export default WorkoutList;

