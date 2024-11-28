import { Database } from "sqlite";
import { Workout, ExerciseCardioDB, ExerciseOtherDB, ExerciseStrengthDB} from "../types";
import { Request, Response } from "express";

/* Add exercise function that adds all types of exercises */
export async function addExercise(req: Request, res: Response, db: Database) {
    try {
        //Futureproof: Any new parameters or "fields" can be added by adding to this section
        const { id, 
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
        } = req.body;
  
        // Ensure the workout exists
        const workout = await db.get('SELECT * FROM workouts WHERE id = ?;', [workout_id]);
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        // Validate required fields
        if (!exercise_name || !exercise_type) {
            return res.status(400).json({ error: "Missing required fields: exercise_name or exercise_type" });
        }
  
        // Validate and handle different exercise types
        let exerciseParams: any = {}; //To store parameters specific to the exercise type
        switch (exercise_type) {
        case "Strength Training":
            exerciseParams = { sets, reps, weight };
            break;
  
        //With cardio, the required fields are distance, duration, speed
        case "Cardio":
            exerciseParams = { distance, duration, speed };
            break;
  
        case "Mind/Body":
            exerciseParams = { duration, intensity }; 
            break;

        default:
          return res.status(400).json({ error: `Invalid exercise_type: ${exercise_type}` });
      }
  
      // Insert the new exercise
      const result = await db.run(
        `INSERT INTO exercises (
            id,
            workout_id, 
            exercise_name, 
            exercise_type,
            set_count,
            rep_count,
            weight_count,
            distance,
            duration
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            id,
            workout_id,
            exercise_name,
            exercise_type,
            exerciseParams.sets || null,
            exerciseParams.reps || null,
            exerciseParams.weight || null,
            exerciseParams.distance || null,
            exerciseParams.duration || null,
            exerciseParams.intensity || null
        ]
      );
  
      res.status(201).json({
        message: "Exercise added successfully",
        exercise: {
            id: result.lastID,
            workout_id,
            exercise_name,
            exercise_type,
            ...exerciseParams,
        },
      });
    } catch (error) {
      console.error("Error adding exercise:", error);
      res.status(500).json({ error: "An error occurred while adding the exercise" });
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