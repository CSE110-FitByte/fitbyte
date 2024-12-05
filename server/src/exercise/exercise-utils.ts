import { Database } from "sqlite";
import { Request, Response } from "express";

/* Add exercise function that adds all types of exercises */
export async function addExercise(req: Request, res: Response, db: Database) {
    try {
        const { workout_id, exercises } = req.body; // Expect an array of exercises
  
      // Validate the workout
      const workout = await db.get('SELECT * FROM workouts WHERE id = ?;', [workout_id]);
    if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
    }
  
    if (!Array.isArray(exercises) || exercises.length === 0) {
        return res.status(400).json({ error: "No exercises provided" });
      }
  
      // Prepare SQL statements for batch insertion
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
          `INSERT INTO exercises (
            workout_id,
            exercise_name,
            exercise_type,
            set,
            rep,
            weight,
            distance,
            speed,
            duration,
            intensity
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
  
      // Execute all insertions
      await Promise.all(insertPromises);
  
      res.status(201).json({ message: "All exercises added successfully" });
    } catch (error) {
        console.error("Error adding exercises:", error);
        res.status(500).json({ error: "An error occurred while adding exercises" });
    }
}

/* Delete exercise function: Deletes an exercise from database when "x" button is clicked */
export async function deleteExercise(req: Request, res: Response, db: Database) {
    try {
        const { id } = req.params; // Extract the exercise ID from the request parameters

        // Validate that the ID is provided
        if (!id) {
            return res.status(400).json({ error: "Exercise ID is required" });
        }

        // Check if the exercise exists
        const exercise = await db.get('SELECT * FROM exercises WHERE id = ?;', [id]);
        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        // Delete the exercise from the database
        await db.run('DELETE FROM exercises WHERE id = ?;', [id]);

        res.status(200).json({ 
            message: "Exercise deleted successfully", 
            deletedExercise: { id, ...exercise } 
        });
    } catch (error) {
        console.error("Error deleting exercise:", error);
        res.status(500).json({ error: "An error occurred while deleting the exercise" });
    }
  }