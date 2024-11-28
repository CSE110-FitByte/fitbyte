import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
 // Open the database connection
 const db = await open({
   filename: "database.sqlite",
   driver: sqlite3.Database,
 });
 // Create a "workouts", "exercises", "goals" table if it doesn't exist
 await db.exec(`
     CREATE TABLE IF NOT EXISTS workouts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_name TEXT NOT NULL
     );

     CREATE TABLE IF NOT EXISTS exercises_strength (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER NOT NULL,
          exercise_name TEXT NOT NULL,
          exercise_type TEXT NOT NULL,
          set_count INTEGER DEFAULT NULL,
          weight_count INTEGER DEFAULT NULL,
          rep_count INTEGER DEFAULT NULL,
          FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
     );

     CREATE TABLE IF NOT EXISTS exercises_cardio (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER NOT NULL,
          exercise_name TEXT NOT NULL,
          exercise_type TEXT NOT NULL,
          distance_miles FLOAT DEFAULT NULL,
          duration_min FLOAT DEFAULT NULL,
          speed_mph FLOAT DEFAULT NULL,
          FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
     );

     CREATE TABLE IF NOT EXISTS exercises_other (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER NOT NULL,
          exercise_name TEXT NOT NULL,
          exercise_type TEXT NOT NULL,
          duration_min FLOAT DEFAULT NULL,
          intensity_level TEXT DEFAULT NULL,
          FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
     );

     CREATE TABLE IF NOT EXISTS goals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          goal_name TEXT NOT NULL,
          isCompleted INTEGER NOT NULL
     );
 `);
 return db;
};

export default initDB;