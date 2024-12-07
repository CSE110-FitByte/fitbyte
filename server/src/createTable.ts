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

     CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER NOT NULL,
          exercise_name TEXT NOT NULL,
          exercise_type TEXT NOT NULL,
          sets INTEGER DEFAULT NULL,
          reps INTEGER DEFAULT NULL,
          weight INTEGER DEFAULT NULL,
          distance FLOAT DEFAULT NULL,
          duration FLOAT DEFAULT NULL,
          speed FLOAT DEFAULT NULL,
          intensity TEXT DEFAULT NULL,
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