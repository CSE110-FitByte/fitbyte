import { render, screen, fireEvent } from "@testing-library/react";
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

test("Delete Workout", async () => {
  render(<App />);

  const sampleWorkout = ["Dumbbell Bench Press", "Dumbbell Overhead Press", "Lateral Raise"];

  const addExerciseInput = screen.getByPlaceholderText("Exercise Name");
  const addExerciseButton = screen.getByText("Add Exercise");
  const addWorkoutInput = screen.getByPlaceholderText("Workout Name");
  const addWorkoutButton = screen.getByText("Add Workout");

  fireEvent.change(addWorkoutInput, { target: { value: "Push Day #1" } });

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

  const deleteWorkoutButton = screen.getByText("Delete Workout");
  fireEvent.click(deleteWorkoutButton);

  expect(screen.queryByText("Push Day #1")).not.toBeInTheDocument();
  expect(screen.queryByText(/Dumbbell Bench Press/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Dumbbell Overhead Press/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Lateral Raise/)).not.toBeInTheDocument();
});
