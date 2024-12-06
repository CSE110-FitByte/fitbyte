import { Database } from "sqlite";
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
          name,
          exerciseType,
          sets,
          reps,
          weight,
          distance,
          speed,
          duration,
          intensity,
        } = exercise;

        return db.run(
          `INSERT INTO exercises (
            workout_id,
            exercise_name,
            exercise_type,
            sets,
            reps,
            weight,
            distance,
            duration,
            speed,
            intensity
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            workout_id,
            name,
            exerciseType,
            sets || null,
            reps || null,
            weight || null,
            distance || null,
            speed || null,
            duration || null,
            intensity || null,
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

export async function getWorkouts(req: Request, res: Response, db: Database) {
  try {
    // Get all workouts, and the exercises associated with each workout (if any), from the DB: 
    const workouts = await db.all(`
      SELECT workouts.id, workout_name, exercise_name, exercise_type, sets, reps, weight, distance, duration, speed, intensity
      FROM workouts
      LEFT JOIN exercises ON workouts.id = exercises.workout_id;  
    `);
    
    res.status(200).send({ data: workouts });
  } catch (error) {
    return res.status(400).send({ error: `Could not get workouts, + ${error}` });  }
}

/* Update a Workout */
// export async function updateWorkout(req: Request, res: Response, db: Database) {
//     try {
//       const { id } = req.params; // Extract the `id` from the request URL
//       const { name } = req.body; // Extract the new `name` from the request body
  
//       // Validate inputs
//       if (!id || !name) {
//         return res.status(400).json({ message: "Missing required fields: id or name" });
//       }
  
//       // Check if the workout exists
//       const workout = await db.get('SELECT * FROM workouts WHERE id = ?;', [id]);
  
//       if (!workout) {
//         return res.status(404).json({ message: "Workout not found" });
//       }
  
//       // Update the workout
//       const result = await db.run('UPDATE workouts SET workout_name = ? WHERE id = ?;', [name, id]);
  
//       if (result.changes === 0) {
//         return res.status(500).json({ message: "Failed to update workout" });
//       }
  
//       res.status(200).json({ message: "Workout updated successfully", id, name });
//     } catch (error) {
//       console.error("Error updating workout:", error);
//       res.status(500).json({ message: "An error occurred while updating the workout" });
//     }
// }

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
// export async function getWorkoutById(req: Request, res: Response, db: Database) {
//   try {

//     const { id } = req.params; // Extract the `id` from the request URL
//     if (!id) {
//       return res.status(400).json({ message: "Workout ID is required" });
//     }

//     //Check if workout exists
//     const workout = await db.get('SELECT * FROM workouts WHERE id = ?;', [id]);

//     if (workout) {
//       res.status(200).send({ data: workout });
//     } else {
//       res.status(404).json({ message: "Workout not found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving workout:", error);
//     res.status(500).json({ message: "An error occurred while retrieving the workout" });
//   }
// }
