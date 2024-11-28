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
      <div key={index} className='workout-box'>
        <div className="workout-header">
          <h3>{workout.name}</h3>
          <button className="delete-button" onClick={() => deleteWorkout(index)}>
            x
          </button>
        </div>

        {/* Grouped Exercises */}
        {['strength', 'cardio', 'mindbody'].map((type) => {
          const filteredExercises = workout.exercises.filter((exercise) => exercise.exerciseType === type);
          if (filteredExercises.length === 0) return null;

          return (
            <div key={type}>
              <h4>
                {type === 'strength'
                  ? 'Strength Training'
                  : type === 'cardio'
                  ? 'Cardio'
                  : 'Mind/Body'}
              </h4>
              <ul>
                {filteredExercises.map((exercise, idx) => (
                  <li key={idx}>
                    {exercise.name}
                    <br />
                    {(() => {
                      if (type === 'strength') {
                        return (
                          <>
                            {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
                          </>
                        );
                      } else if (type === 'cardio') {
                        return (
                          <>
                            {exercise.distance > 0 && <>{exercise.distance} mi</>}
                            {exercise.distance > 0 && exercise.duration > 0 && ', '}
                            {exercise.duration > 0 && <>{exercise.duration} min</>}
                            {exercise.duration > 0 && exercise.speed > 0 && ', '}
                            {exercise.speed > 0 && <>{exercise.speed} mph</>}
                          </>
                        );
                      } else if (type === 'mindbody') {
                        return (
                          <>
                            {exercise.duration > 0 && <>{exercise.duration} min</>}
                            {exercise.duration > 0 && exercise.intensity !== 'n/a' && ', '}
                            {exercise.intensity !== 'n/a' && <>{exercise.intensity} intensity</>}
                          </>
                        );
                      }
                    })()}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    ))}
  </div>
);


export default WorkoutList;

