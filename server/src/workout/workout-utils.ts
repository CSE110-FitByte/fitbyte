import { Database } from "sqlite";
import { Workout } from "../types";
import { Request, Response } from "express";

/* Initiate workout database, if it hasn't been established already */
export async function createWorkoutServer(req: Request, res: Response, db: Database) {
  try {
    const { name, exercises } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Workout name is required" });
    }

    // Create the workout
    const result = await db.run('INSERT INTO workouts (workout_name) VALUES (?);', [name]);
    const workout_id = result.lastID;

    // If exercises are provided, add them
    if (Array.isArray(exercises) && exercises.length > 0) {
      const insertPromises = exercises.map((exercise) => {
        const {
          exercise_name,
          exercise_type,
          strength_set,
          strength_rep,
          strength_weight,
          cardio_distance,
          cardio_speed,
          cardio_other_duration,
          other_intensity,
        } = exercise;

        return db.run(
          `INSERT INTO exercises_strength (
          workout_id,
          exercise_name,
          exercise_type,
          strength_set,
          strength_rep,
          strength_weight,
          cardio_distance,
          cardio_speed,
          cardio_other_duration,
          other_intensity
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            workout_id,
            exercise_name,
            exercise_type,
            strength_set || null,
            strength_rep || null,
            strength_weight || null,
            cardio_distance || null,
            cardio_speed || null,
            cardio_other_duration || null,
            other_intensity || null,
          ]
        );
      });

      await Promise.all(insertPromises);
    }

    res.status(201).json({ message: "Workout created successfully", workout_id, exercises: exercises || [] });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: "Workout could not be created. Please try again later." });
  }
}

/* Update a Workout */
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
  const { id } = req.params; // Get the workout ID from request parameters

  try {
    // Check if the workout exists
    const workout_to_delete = await db.get('SELECT * FROM workouts WHERE id = ?', [id]);

    if (!workout_to_delete) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Query all related exercises before deleting the workout
    const relatedExercises = await db.all('SELECT * FROM exercises WHERE workout_id = ?', [id]);

    // Delete the workout (ON DELETE CASCADE will handle the exercises)
    await db.run('DELETE FROM workouts WHERE id = ?;', [id]);

    res.status(200).json({
      message: "Workout and all related exercises deleted successfully",
      deletedWorkout: workout_to_delete,
      deletedExercises: relatedExercises,
    });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "An error occurred while deleting the workout" });
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
