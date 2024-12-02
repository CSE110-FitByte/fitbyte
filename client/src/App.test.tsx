import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

test("Renders HomePage initially", () => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>);

  
  // Check if the navigation bar exists
  expect(screen.getByText(/FitByte/i)).toBeInTheDocument();
  expect(screen.getByText(/Workouts/i)).toBeInTheDocument();
  expect(screen.getByText(/Goals/i)).toBeInTheDocument(); // Match the testimonial quote
});
