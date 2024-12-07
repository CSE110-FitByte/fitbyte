// src/hooks/useWorkouts.ts

import { useState, useEffect } from 'react';
import { Workout, Exercise } from '../types/types';
import { createWorkout, removeWorkout, fetchWorkouts } from '../utils/workout-utils';

export const useWorkouts = () => {
  const [workoutName, setWorkoutName] = useState<string>('');
  const [exerciseName, setExerciseName] = useState<string>('');
  const [exerciseType, setExerciseType] = useState<string>('strength');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [intensity, setIntensity] = useState<string>('n/a')
  

  // Load workouts from DB when component mounts
  useEffect(() => {
    loadWorkouts(); 
  }, []);

  const loadWorkouts = async () => {
    try {
      // Call upon API to get all workouts
      const workoutList = await fetchWorkouts();
      setWorkouts(workoutList);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const addExercise = () => {
    if (exerciseName.trim() !== '') {
      setCurrentExercises([...currentExercises, { name: exerciseName.trim(), exerciseType, sets, reps, weight, distance, duration, speed, intensity}]);
      
      setExerciseName('');

      setSets(0);
      setWeight(0);
      setReps(0);

      setDistance(0);
      setDuration(0);
      setSpeed(0);
    }
  };

  const addWorkout = (newWorkout?: Workout) => {
    if (newWorkout) {
      // Add the provided workout directly
      setWorkouts([...workouts, newWorkout]);
      createWorkout(newWorkout);
    }

    if (workoutName.trim() !== '' && currentExercises.length > 0) {
      const newWorkout: Workout = {
        name: workoutName.trim(),
        exercises: currentExercises,
      };
      setWorkouts([...workouts, newWorkout]);

      // Call upon API to create workout
      createWorkout(newWorkout);

      // Reset for next workout addition
      setWorkoutName('');
      setCurrentExercises([]);
    }
  };

  const deleteExercise = (index: number) => {
    const updatedExercises = currentExercises.filter((_, i) => i !== index);
    setCurrentExercises(updatedExercises);
  };

  const deleteWorkout = (index: number, name: string) => {
    // Call upon API to delete workout
    removeWorkout(name);

    // update workouts by filtering out the workout with the given name
    // const updatedWorkouts = workouts.filter((workout) => workout.name !== name);
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);

  };

  const saveWorkouts = () => {
    alert('Workouts have been saved for another day!');
  };

  return {
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
    currentExercises,
    addExercise,
    deleteExercise,
    workouts,
    addWorkout,
    saveWorkouts,
    deleteWorkout, 
  };
};