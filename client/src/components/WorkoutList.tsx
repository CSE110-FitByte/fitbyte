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
          <button
            style={{ margin: "10px", padding: "5px 10px" }}
            onClick={() => deleteWorkout(index)}
          >
            x
          </button>
        </div>
        <ul>
          {workout.exercises.map((exercise, idx) => (
            <li key={idx}>
              {exercise.name}
              <br/>
              {(() => {
              if (exercise.exerciseType === "strength") {
                return (
                  <>
                    {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
                  </>
                );
              } else if (exercise.exerciseType === "cardio") {
                return (
                  <>
                  {exercise.distance > 0 && <>{exercise.distance} mi</>}
                  {exercise.distance > 0 && exercise.duration > 0 && ', '}
                  {exercise.duration > 0 && <>{exercise.duration} min</>}
                  {exercise.duration > 0 && exercise.speed > 0 && ', '}
                  {exercise.distance > 0 && exercise.duration === 0 && exercise.speed > 0 && ', '}
                  {exercise.speed > 0 && <>{exercise.speed} mph</>}
                  </>
                );
              } else if (exercise.exerciseType === "mindbody") {
                return (
                  <>
                   {exercise.duration > 0 && <>{exercise.duration} min</>} 
                   {exercise.duration > 0 && exercise.intensity !== 'n/a' && ', '} 
                   {exercise.intensity !== 'n/a' && <>{exercise.intensity} intensity</>}
                  </>
                )
              }
              })()}           
           </li>
          ))}
        </ul>

      </div>
    ))}
  </div>
);


export default WorkoutList;

