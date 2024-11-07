import React from 'react';

interface SaveWorkoutsButtonProps {
  saveWorkouts: () => void;
}

const SaveWorkoutsButton: React.FC<SaveWorkoutsButtonProps> = ({ saveWorkouts }) => (
  <button onClick={saveWorkouts} style={{ padding: '10px 20px', marginTop: '20px' }}>
    Save Workouts
  </button>
);

export default SaveWorkoutsButton;