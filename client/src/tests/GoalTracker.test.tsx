import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useGoals } from '../hooks/useGoals';
import GoalTracker from '../components/GoalTracker';
import { Goal } from '../types/types';

jest.mock('../hooks/useGoals'); // Mock the useGoals hook to avoid actual state manipulation

describe('GoalTracker', () => {
  const addGoalMock = jest.fn();
  const deleteGoalMock = jest.fn();
  const completeGoalMock = jest.fn();

  beforeEach(() => {
    (useGoals as jest.Mock).mockReturnValue({
      goals: [],
      addGoal: addGoalMock,
      deleteGoal: deleteGoalMock,
      completeGoal: completeGoalMock,
    });
    render(<GoalTracker />);
  });

  afterEach(() => {
    cleanup();
  });

  test('should render the GoalTracker component', () => {
    // Check if the GoalTracker is rendering properly
    expect(screen.getByText(/Goal Tracker/i)).toBeInTheDocument();
  });

  test('should add a new goal', () => {
    const goalTitle = 'New Goal';

    // Simulate typing a new goal title into the input field
    fireEvent.change(screen.getByPlaceholderText('Goal title'), {
      target: { value: goalTitle },
    });

    // Simulate clicking the "Add Goal" button
    fireEvent.click(screen.getByText('Add Goal'));

    // Check if the addGoal function was called with the correct title
    expect(addGoalMock).toHaveBeenCalledWith({
      id: expect.any(String),
      title: goalTitle,
      isCompleted: false,
    });
  });

  test('should complete a goal', () => {
    const goal: Goal = { id: '1', title: 'Goal 1', isCompleted: false };

    // Mock the useGoals hook with a goal
    (useGoals as jest.Mock).mockReturnValue({
      goals: [goal],
      addGoal: addGoalMock,
      deleteGoal: deleteGoalMock,
      completeGoal: completeGoalMock,
    });

    // Re-render the component with the mocked goal
    render(<GoalTracker />);

    // Simulate clicking the checkbox to mark the goal as completed
    const checkbox = screen.getByLabelText('Goal 1');
    fireEvent.click(checkbox);

    // Check if the completeGoal function was called
    expect(completeGoalMock).toHaveBeenCalledWith('1');
  });

  test('should delete a goal', () => {
    const goal: Goal = { id: '1', title: 'Goal 1', isCompleted: false };

    // Mock the useGoals hook with a goal
    (useGoals as jest.Mock).mockReturnValue({
      goals: [goal],
      addGoal: addGoalMock,
      deleteGoal: deleteGoalMock,
      completeGoal: completeGoalMock,
    });

    // Re-render the component with the mocked goal
    render(<GoalTracker />);

    // Simulate clicking the "X" to delete the goal
    fireEvent.click(screen.getByText('X'));

    // Check if the deleteGoal function was called with the correct id
    expect(deleteGoalMock).toHaveBeenCalledWith('1');
  });
});