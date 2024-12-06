import { createWorkoutServer, deleteWorkout, getWorkouts} from "./workout-utils";
import { Request, Response, Application } from "express";
import { Database } from "sqlite";

export function createWorkoutEndpoints(app: Application, db: Database) {
  // Create a new workout
  app.post("/workouts", (req: Request, res: Response) => {
    createWorkoutServer(req, res, db);
  });

  // Delete a specific workout by ID
  app.delete("/workouts/:name", (req: Request, res: Response) => {
    deleteWorkout(req, res, db);
  });

  // Get all workouts
  app.get("/workouts", async (req: Request, res: Response) => {
    getWorkouts(req, res, db);
  });

  // // Get a specific workout by ID
  // app.get("/workouts/:id", (req: Request, res: Response) => {
  //   getWorkoutById(req, res, db);
  // });

  // // Update a specific workout by ID
  // app.put("/workouts/:id", (req: Request, res: Response) => {
  //   updateWorkout(req, res, db);
  // });

}