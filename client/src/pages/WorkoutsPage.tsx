// src/App.tsx
import React, { useState } from 'react';
import '../index.css';
import WorkoutList from '../components/WorkoutList';
import { useWorkouts } from '../hooks/useWorkouts';
import GoalTracker from '../components/GoalTracker'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WorkoutInput from '../components/WorkoutInput';

const WorkoutsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    workoutName,
    setWorkoutName,
    exerciseName,
    setExerciseName,
    exerciseType,
    setExerciseType,
    sets,
    setSets,
    weight,
    setWeight,
    reps,
    setReps,
    speed,
    setSpeed,
    distance,
    setDistance,
    duration,
    setDuration,
    intensity,
    setIntensity,
    currentExercises,
    addExercise,
    deleteExercise,
    workouts,
    addWorkout,
    saveWorkouts,
    deleteWorkout,
  } = useWorkouts();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Top Header Section */}
      <header>
        <h1>Workout Planner</h1>
        <Button variant="contained" onClick={handleOpenModal} style={{ marginTop: '10px' }}>
          + Create Workout
        </Button>
      </header>
  
      {/* Main Content */}
      <div className="main-container">
        {/* Center Column */}
        <div className="center-column">
          <WorkoutList workouts={workouts} deleteWorkout={deleteWorkout} addWorkout={addWorkout} />
        </div>
      </div>

      {/* Modal for Creating Workouts */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box className="modal-box">
        <WorkoutInput
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
          exerciseName={exerciseName}
          setExerciseName={setExerciseName}
          exerciseType={exerciseType}
          setExerciseType={setExerciseType}
          sets={sets}
          setSets={setSets}
          reps={reps}
          setReps={setReps}
          weight={weight}
          setWeight={setWeight}
          distance={distance}
          setDistance={setDistance}
          duration={duration}
          setDuration={setDuration}
          speed={speed}
          setSpeed={setSpeed}
          intensity={intensity}
          setIntensity={setIntensity}
          addExercise={addExercise}
          deleteExercise={deleteExercise}
          currentExercises={currentExercises}
          addWorkout={addWorkout}
          deleteWorkout={deleteWorkout}
        />
      </Box>
    </Modal>
    </div>
  );
};

export default WorkoutsPage;
