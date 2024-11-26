import React, { ChangeEvent } from 'react';
import { Exercise } from '../types/types'

interface WorkoutInputProps {
  workoutName: string;
  setWorkoutName: (value: string) => void;
  exerciseName: string;
  setExerciseName: (value: string) => void;
  exerciseType: string;
  setExerciseType: (value: string) => void;
  sets: number;
  setSets: (value: number) => void;
  reps: number;
  setReps: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  distance: number;
  setDistance: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
  speed: number;
  setSpeed: (value: number) => void;
  intensity: string;
  setIntensity: (value: string) => void;
  addExercise: () => void;
  deleteExercise: (value: number) => void;
  currentExercises: Exercise[];
  addWorkout: () => void;
  deleteWorkout: (index: number) => void;
}

const WorkoutInput: React.FC<WorkoutInputProps> = ({
  workoutName,
  setWorkoutName,
  exerciseName,
  setExerciseName,
  exerciseType,
  setExerciseType,
  sets,
  setSets,
  reps,
  setReps,
  weight,
  setWeight,
  distance,
  setDistance,
  duration,
  setDuration,
  speed,
  setSpeed,
  intensity,
  setIntensity,
  addExercise,
  deleteExercise,
  currentExercises,
  addWorkout,
}) => {
  const handleWorkoutNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.target.value);
  };

  const handleExerciseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleSetsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSets(Number(e.target.value));
  };

  const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReps(Number(e.target.value));
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(e.target.value));
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  const handleSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div>
      <h2>Create a New Workout</h2>
      <input
        type="text"
        value={workoutName}
        onChange={handleWorkoutNameChange}
        placeholder="Workout Name"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
      />
      <h3>Add Exercises</h3>
      <label htmlFor="selectType">Select Category</label>
      <select id="selectType" aria-label="category" onChange={(e) => setExerciseType(e.target.value)} 
              style={{display: 'block', width: '70%', padding: '8px', marginBottom: '10px'}}>
        <option value="strength">Strength Training</option>
        <option value="cardio">Cardio</option>
        <option value="mindbody">Mind/Body</option>
      </select>

      <input
        type="text"
        value={exerciseName}
        onChange={handleExerciseNameChange}
        placeholder="Exercise Name"
        style={{ width: '70%', padding: '8px'}}
      />

      {exerciseType === "strength" && (
      <>
      <input
        type="number"
        value={sets}
        onChange={handleSetsChange}
        placeholder="Sets"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="1"
      />
      <label>Sets</label>
    
      <input
        type="number"
        value={reps}
        onChange={handleRepsChange}
        placeholder="Reps"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Reps</label>

      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        placeholder="Weight (lbs)"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Weight (lbs)</label>
      </>
      )}

      {exerciseType === "cardio" && (
      <>
      <input
        type="number"
        value={distance}
        onChange={handleDistanceChange}
        placeholder="miles"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Distance (miles)</label>
      
      <input
        type="number"
        value={duration}
        onChange={handleDurationChange}
        placeholder="Minutes"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Duration (min)</label>
       
      <input
        type="number"
        value={speed}
        onChange={handleSpeedChange}
        placeholder="mph"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Speed (mph)</label>
      </>
      )}

      {exerciseType === "mindbody" && (
      <>
      <input
        type="number"
        value={duration}
        onChange={handleDurationChange}
        placeholder="Minutes"
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
        min="0"
      />
      <label>Duration (min)</label>

      <select
        id="intensity" aria-label="intensity" onChange={(e) => setIntensity(e.target.value)}
        style={{ width: '70%', padding: '8px', marginBottom: '10px' }}
      >
        <option value="n/a">--optional--</option>
        <option value="Light">Light</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
      </select>
      <label>Intensity</label>
      </>
      )}

      <button onClick={addExercise} style={{ padding: '8px 16px', marginLeft: '10px' }}>
        Add Exercise
      </button>

      <ul>
        {currentExercises.map((exercise, index) => (
          <li key={index}>

            {exercise.name}
            <br/>

            {(() => {
              if (exercise.exerciseType === "strength") {
                return (
                  <>
                    {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
                  </>
                )
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
                )      
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

            <button onClick={() => deleteExercise(index)} style={{padding: '1px 7px', marginLeft: '10px'}}>
               Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={addWorkout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Workout
      </button>
    </div>
  );
};

export default WorkoutInput;