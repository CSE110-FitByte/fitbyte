import { render, screen, fireEvent, within } from "@testing-library/react";
import {act} from 'react';
import App from "../App";

describe("Create New Workout", () => {
  test("Renders Create-Workout form", () => {
    render(<App />);

    const addExerciseButton = screen.getByText("Add Exercise");
    const addWorkoutButton = screen.getByText("Add Workout");

    expect(addExerciseButton).toBeInTheDocument();
    expect(addWorkoutButton).toBeInTheDocument();
  });

  test("Create New Exercise", async () => {
    render(<App />);

    const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
    const addExerciseButton = screen.getByText("Add Exercise");

    fireEvent.change(addExerciseInput, { target: { value: "Pushup" } });
    fireEvent.click(addExerciseButton);

    const newExercise = await screen.findByText(/Pushup/);

    expect(newExercise).toBeInTheDocument();
  });

  test("Create New Workout", async () => {
    render(<App />);

    const sampleWorkout = ["Dumbbell Bench Press", "Dumbbell Overhead Press", "Lateral Raise"];

    const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
    const addExerciseButton = screen.getByText("Add Exercise");
    const addWorkoutInput = screen.getByPlaceholderText("Workout Name");
    const addWorkoutButton = screen.getByText("Add Workout");

    fireEvent.change(addWorkoutInput, { target: { value: "Push Day #1" } });

    // Loop through the sampleWorkout arr, add each exercise to the workout
    for (let i = 0; i < sampleWorkout.length; i++) {
      fireEvent.change(addExerciseInput, { target: { value: sampleWorkout[i] } });
      fireEvent.click(addExerciseButton);
    }

    fireEvent.click(addWorkoutButton);

    const newWorkout = await screen.findByText("Push Day #1");
    const newExercise0 = await screen.findByText(/Dumbbell Bench Press/);
    const newExercise1 = await screen.findByText(/Dumbbell Overhead Press/);
    const newExercise2 = await screen.findByText(/Lateral Raise/);

    expect(newWorkout).toBeInTheDocument();
    expect(newExercise0).toBeInTheDocument();
    expect(newExercise1).toBeInTheDocument();
    expect(newExercise2).toBeInTheDocument();
  });

  test("Delete Exercise", async () => {
    render(<App />);

    const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
    const addExerciseButton = screen.getByText("Add Exercise");

    fireEvent.change(addExerciseInput, { target: { value: "Pushup" } });
    fireEvent.click(addExerciseButton);

    const newExercise = await screen.findByText(/Pushup/);
    expect(newExercise).toBeInTheDocument();

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Pushup/)).not.toBeInTheDocument();
  });
});

test("Create and add a Strength exercise", async () => {
  render(<App />);

  const addWorkoutButton = screen.getByText("Add Workout");


  const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
  const addExerciseButton = screen.getByText("Add Exercise");
  const setsInput = screen.getByPlaceholderText("Sets");
  const repsInput = screen.getByPlaceholderText("Reps");
  const weightInput = screen.getByPlaceholderText("Weight (lbs)");

  // Select Strength category
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "strength" } });

  fireEvent.change(addExerciseInput, { target: { value: "Pushup" } });
  fireEvent.change(setsInput, { target: { value: "3" } });
  fireEvent.change(repsInput, { target: { value: "15" } });
  fireEvent.change(weightInput, { target: { value: "0" } });

  fireEvent.click(addExerciseButton);

  const newExercise = await screen.findByText(/Pushup/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/3 sets, 15 reps, 0 lbs/)).toBeInTheDocument();

  fireEvent.click(addWorkoutButton);
  
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/3 sets, 15 reps, 0 lbs/)).toBeInTheDocument();

});

test("Create and add a Cardio exercise", async () => {
  render(<App />);

  const addWorkoutButton = screen.getByText("Add Workout");


   // Select Cardio category
   fireEvent.change(screen.getByRole("combobox"), { target: { value: "cardio" } });


  const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
  const addExerciseButton = screen.getByText("Add Exercise");
  const distanceInput = screen.getByPlaceholderText("Distance (miles)");
  const durationInput = screen.getByPlaceholderText("Duration (minutes)");
  const speedInput = screen.getByPlaceholderText("Speed (mph)");

 
  fireEvent.change(addExerciseInput, { target: { value: "Running" } });
  fireEvent.change(distanceInput, { target: { value: "5" } });
  fireEvent.change(durationInput, { target: { value: "30" } });
  fireEvent.change(speedInput, { target: { value: "6" } });

  fireEvent.click(addExerciseButton);

  const newExercise = await screen.findByText(/Running/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/5 mi, 30 min, 6 mph/)).toBeInTheDocument();

  fireEvent.click(addWorkoutButton);

  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/5 mi, 30 min, 6 mph/)).toBeInTheDocument();

});

test("Create and add a Cardio exercise with only duration", async () => {
  render(<App />);

  const addWorkoutButton = screen.getByText("Add Workout");

  // Select Cardio category
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "cardio" } });

  // Fill only duration input
  fireEvent.change(screen.getByPlaceholderText("Exercise Name"), { target: { value: "Cycling" } });
  fireEvent.change(screen.getByPlaceholderText("Duration (minutes)"), { target: { value: "20" } });

  fireEvent.click(screen.getByText("Add Exercise"));

  // Verify only duration is displayed
  const newExercise = await screen.findByText(/Cycling/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/20 min/)).toBeInTheDocument();
  expect(screen.queryByText("mi")).not.toBeInTheDocument();
  expect(screen.queryByText("Speed (mph)")).not.toBeInTheDocument();

  //Add to workout list
  fireEvent.click(addWorkoutButton);

  expect(screen.getByText(/20 min/)).toBeInTheDocument();
  expect(screen.queryByText("mi")).not.toBeInTheDocument();
  expect(screen.queryByText("Speed (mph)")).not.toBeInTheDocument();

});

test("Create and add a Cardio exercise with only speed", async () => {
  render(<App />);

  // Select Cardio category
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "cardio" } });

  // Fill only the speed input
  fireEvent.change(screen.getByPlaceholderText("Exercise Name"), { target: { value: "Cycling" } });
  fireEvent.change(screen.getByPlaceholderText("Speed (mph)"), { target: { value: "10" } });

  fireEvent.click(screen.getByText("Add Exercise"));

  // Verify only speed is displayed
  const newExercise = await screen.findByText(/Cycling/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/10 mph/)).toBeInTheDocument();
  expect(screen.queryByText("mi")).not.toBeInTheDocument();
  expect(screen.queryByText("min")).not.toBeInTheDocument();
});

test("Create and add a Cardio exercise with only distance", async () => {
  render(<App />);

  const addWorkoutButton = screen.getByText("Add Workout");


  // Select Cardio category
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "cardio" } });

  // Fill only the distance input
  fireEvent.change(screen.getByPlaceholderText("Exercise Name"), { target: { value: "Walking" } });
  fireEvent.change(screen.getByPlaceholderText("Distance (miles)"), { target: { value: "3" } });

  fireEvent.click(screen.getByText("Add Exercise"));

  // Verify only distance is displayed
  const newExercise = await screen.findByText(/Walking/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/3 mi/)).toBeInTheDocument();
  expect(screen.queryByText("min")).not.toBeInTheDocument();
  expect(screen.queryByText("Speed (mph)")).not.toBeInTheDocument();

  fireEvent.click(addWorkoutButton);

   // Verify only distance is displayed once added to Workout List
   expect(newExercise).toBeInTheDocument();
   expect(screen.getByText(/3 mi/)).toBeInTheDocument();
   expect(screen.queryByText("min")).not.toBeInTheDocument();
   expect(screen.queryByText("Speed (mph)")).not.toBeInTheDocument();

});

test("Create and add a Cardio exercise with distance and speed", async () => {
  render(<App />);

  // Select Cardio category
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "cardio" } });

  // Fill the distance and speed inputs
  fireEvent.change(screen.getByPlaceholderText("Exercise Name"), { target: { value: "Jogging" } });
  fireEvent.change(screen.getByPlaceholderText("Distance (miles)"), { target: { value: "2" } });
  fireEvent.change(screen.getByPlaceholderText("Speed (mph)"), { target: { value: "5" } });

  fireEvent.click(screen.getByText("Add Exercise"));

  // Verify both distance and speed are displayed
  const newExercise = await screen.findByText(/Jogging/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/2 mi, 5 mph/)).toBeInTheDocument();
  expect(screen.queryByText("min")).not.toBeInTheDocument();
});

test("Create and add a Cardio exercise with distance and duration", async () => {
  render(<App />);

  // Select Cardio category
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "cardio" } });

  // Fill the distance and duration inputs
  fireEvent.change(screen.getByPlaceholderText("Exercise Name"), { target: { value: "Walking" } });
  fireEvent.change(screen.getByPlaceholderText("Distance (miles)"), { target: { value: "3" } });
  fireEvent.change(screen.getByPlaceholderText("Duration (minutes)"), { target: { value: "45" } });

  fireEvent.click(screen.getByText("Add Exercise"));

  // Verify both distance and duration are displayed with a comma
  const newExercise = await screen.findByText(/Walking/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/3 mi, 45 min/)).toBeInTheDocument();
  expect(screen.queryByText("Speed (mph)")).not.toBeInTheDocument();
});


test("Create and add a Mind/Body exercise", async () => {
  render(<App />);

  // Select Mind/Body category
  fireEvent.change(screen.getByRole("combobox", { name: "category" }), {
    target: { value: "mindbody" },
  });
  const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
  const durationInput = screen.getByPlaceholderText("Duration (minutes)");

  // Fill in the details for the Mind/Body exercise
  fireEvent.change(addExerciseInput, { target: { value: "Yoga" } });
  fireEvent.change(durationInput, { target: { value: "60" } });
  fireEvent.change(screen.getByRole("combobox", { name: "Intensity (Optional)" }), {
    target: { value: "Moderate" },
  });

  // Add the exercise
  fireEvent.click(screen.getByText("Add Exercise"));

  // Verify the exercise is displayed correctly
  const newExercise = await screen.findByText(/Yoga/);
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/60 min, Moderate intensity/)).toBeInTheDocument();

  fireEvent.click(screen.getByText("Add Workout"));
  expect(newExercise).toBeInTheDocument();
  expect(screen.getByText(/60 min, Moderate intensity/)).toBeInTheDocument();

});


test("Delete Workout", async () => {
  render(<App />);
  const sampleWorkout = ["Squat", "Curl", "Deadlift"];

  const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
  const addExerciseButton = screen.getByText("Add Exercise");
  const addWorkoutInput = screen.getByPlaceholderText("Workout Name");
  const addWorkoutButton = screen.getByText("Add Workout");

  fireEvent.change(addWorkoutInput, { target: { value: "Workout 2" } });

  for (let i = 0; i < sampleWorkout.length; i++) {
    fireEvent.change(addExerciseInput, { target: { value: sampleWorkout[i] } });
    fireEvent.click(addExerciseButton);
  }

  fireEvent.click(addWorkoutButton);
  await screen.findByText("Workout 2");

  const newWorkout = await screen.findByText("Workout 2");
  const newExercise0 = await screen.findByText(/Squat/);
  const newExercise1 = await screen.findByText(/Curl/);
  const newExercise2 = await screen.findByText(/Deadlift/);

  const workout2Container = screen.getByText("Workout 2").closest('div');
  if (workout2Container) {
    const deleteWorkoutButton = within(workout2Container).getByRole('button', { name: /x/ });

    // Ensure the button is inside the correct container
    expect(workout2Container).toContainElement(deleteWorkoutButton);
    fireEvent.click(deleteWorkoutButton);
  }

  expect(screen.queryByText("Workout 2")).not.toBeInTheDocument();
  expect(screen.queryByText(/Squat/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Curl/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Deadlift/)).not.toBeInTheDocument();
});

