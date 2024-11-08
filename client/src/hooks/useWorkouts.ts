// src/hooks/useWorkouts.ts

import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtil';
import { Workout, Exercise } from '../types/types';

export const useWorkouts = () => {
  const [workoutName, setWorkoutName] = useState<string>('');
  const [exerciseName, setExerciseName] = useState<string>('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0)

  useEffect(() => {
    const savedWorkouts = loadFromLocalStorage<Workout[]>('workouts');
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage<Workout[]>('workouts', workouts);
  }, [workouts]);

  const addExercise = () => {
    if (exerciseName.trim() !== '') {
      setCurrentExercises([...currentExercises, { name: exerciseName.trim(), sets, weight }]);
      setExerciseName('');
      setSets(1);
      setWeight(0);
    }
  };

  const addWorkout = () => {
    if (workoutName.trim() !== '' && currentExercises.length > 0) {
      const newWorkout: Workout = {
        name: workoutName.trim(),
        exercises: currentExercises,
      };
      setWorkouts([...workouts, newWorkout]);
      setWorkoutName('');
      setCurrentExercises([]);
    }
  };

  const saveWorkouts = () => {
    alert('Workouts have been saved for another day!');
  };

  return {
    workoutName,
    setWorkoutName,
    exerciseName,
    setExerciseName,
    sets,
    setSets,
    weight,
    setWeight,
    currentExercises,
    addExercise,
    workouts,
    addWorkout,
    saveWorkouts,
  };
};
