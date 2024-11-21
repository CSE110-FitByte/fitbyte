import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import GoalTracker from '../components/GoalTracker';

describe('GoalTracker', () => {

  afterEach(() => {
    cleanup();
  });

  test('should add a new goal', async () => {
    render(<GoalTracker />);

    const goalTitle = "New Goal";

    // Simulate typing a new goal title into the input field
    const input = screen.getByPlaceholderText('Goal title');
    fireEvent.change(input, { target: { value: goalTitle } });

    // Simulate clicking the "Add Goal" button
    const addButton = screen.getByText('Add Goal');
    fireEvent.click(addButton);

    // Check if the goal is displayed on the screen after being added
    const newGoal = await screen.findByText(goalTitle);
    expect(newGoal).toBeInTheDocument();
  });

  test('should complete a goal', async () => {
    render(<GoalTracker />);

    // Add a goal first
    const goalTitle = "Goal to complete";
    const input = screen.getByPlaceholderText('Goal title');
    fireEvent.change(input, { target: { value: goalTitle } });
    fireEvent.click(screen.getByText('Add Goal'));

    // Find the checkbox and click it to mark the goal as completed
    const checkbox = screen.getByLabelText(goalTitle);  // Assuming the label for the checkbox is the goal title
    fireEvent.click(checkbox);

    // Check if the goal is marked as completed (i.e., the title is struck-through)
    const completedGoal = await screen.findByText(goalTitle);
    expect(completedGoal).toHaveStyle('text-decoration: line-through');
  });

  test('should delete a goal', async () => {
    render(<GoalTracker />);

    // Add a goal first
    const goalTitle = "Goal to delete";
    const input = screen.getByPlaceholderText('Goal title');
    fireEvent.change(input, { target: { value: goalTitle } });
    fireEvent.click(screen.getByText('Add Goal'));

    // Check if the goal appears on the screen
    const goalElement = await screen.findByText(goalTitle);
    expect(goalElement).toBeInTheDocument();

    // Find and click the delete "X" button
    const deleteButton = screen.getByText('X');
    fireEvent.click(deleteButton);

    // Check if the goal is no longer on the screen
    const deletedGoal = screen.queryByText(goalTitle);
    expect(deletedGoal).not.toBeInTheDocument();
  });
});
