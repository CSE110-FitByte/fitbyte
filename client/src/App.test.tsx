import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {MemoryRouter, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import WorkoutsPage from './pages/WorkoutsPage'; // Adjust the path as necessary

test("Renders HomePage initially", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  
  // Check if the navigation bar exists
  expect(screen.getByText(/Workouts/i)).toBeInTheDocument();
  expect(screen.getByText(/Goals/i)).toBeInTheDocument(); // Match the testimonial quote
});
