import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

test('Renders Workout Planner', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const title = screen.getByText(/FitByte/);
  expect(title).toBeInTheDocument();
});
