import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Workout Planner', () => {
  render(<App />);
  const linkElement = screen.getByText(/Workout Planner/);
  expect(linkElement).toBeInTheDocument();
});
