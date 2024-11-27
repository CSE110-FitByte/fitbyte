import { Database } from "sqlite";
import { Workout } from "../types";
import { Request, Response } from "express";

/* Initiate workout database, if it hasn't been established already */
export async function createWorkoutServer(req: Request, res: Response, db: Database) {
  try {
    const { name } = req.body as { name: string };

    if (!name) {
      return res.status(400).send({ error: "Missing required field: name" });
    }

    // Insert the workout name into the database. ID get auto-incremented 
    const result = await db.run('INSERT INTO workouts (workout_name) VALUES (?);', [name]);

    // Retrieve the last inserted ID for the response
    const newId = result.lastID;

    res.status(201).send({ id: newId, name });
  } catch (error) {
      console.error("Error creating workout:", error);
      res.status(500).send({ error: "Workout could not be created. Please try again later." });
  }
}

/* Update/Insert a Workout */
export async function updateWorkout(req: Request, res: Response, db: Database) {
    try {
      const { id } = req.params; // Extract the `id` from the request URL
      const { name } = req.body; // Extract the new `name` from the request body
  
      // Validate inputs
      if (!id || !name) {
        return res.status(400).json({ message: "Missing required fields: id or name" });
      }
  
      // Check if the workout exists
      const workout = await db.get('SELECT * FROM workouts WHERE id = ?;', [id]);
  
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      // Update the workout
      const result = await db.run('UPDATE workouts SET workout_name = ? WHERE id = ?;', [name, id]);
  
      if (result.changes === 0) {
        return res.status(500).json({ message: "Failed to update workout" });
      }
  
      res.status(200).json({ message: "Workout updated successfully", id, name });
    } catch (error) {
      console.error("Error updating workout:", error);
      res.status(500).json({ message: "An error occurred while updating the workout" });
    }
}

/* Delete a specific workout */
export async function deleteWorkout(req: Request, res: Response, db: Database) {
  const { id } = req.params; // Get the ID from request parameters

  try {
    // Check if the workout exists
    const workout_to_delete = await db.get('SELECT * FROM workouts WHERE id = ?', [id]);

    if (!workout_to_delete) {
      // workout to delete not found
      return res.status(404).json({ message: "Expense not found" });
    }

    // Delete the workout
    await db.run('DELETE FROM workouts WHERE id = ?;', [id]);
    res.status(200).json({ message: "Workout and all exercises in workout deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}

/* Get a specific workout */
export async function getWorkoutById(req: Request, res: Response, db: Database) {
  try {

    const { id } = req.params; // Extract the `id` from the request URL
    if (!id) {
      return res.status(400).json({ message: "Workout ID is required" });
    }

    //Check if workout exists
    const workout = await db.get('SELECT * FROM workouts WHERE id = ?;', [id]);

    if (workout) {
      res.status(200).send({ data: workout });
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    console.error("Error retrieving workout:", error);
    res.status(500).json({ message: "An error occurred while retrieving the workout" });
  }
}
