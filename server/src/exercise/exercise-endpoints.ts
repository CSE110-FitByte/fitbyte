import { addExercise, deleteExercise } from "./exercise-utils";
import { Request, Response, Application } from "express";
import { Database } from "sqlite";

export function createExerciseEndpoints(app: Application, db: Database) {
    // Add an exercise
    app.post("/exercises/:id", (req: Request, res: Response) => {
      addExercise(req, res, db);
    });

    // Delete an exercise
    app.delete("/exercises/:id", (req: Request, res: Response) => {
      deleteExercise(req, res, db);
    });
  }