import express from "express";
import {
  getAll,
  getById,
  create,
  remove,
  getCandidates,
} from "../controllers/couriers";

// Let's dispatch request to corresponding controllers methods

export const couriersRouter = express.Router();

couriersRouter.post("/lookup", getCandidates);

couriersRouter.get("", getAll);
couriersRouter.get("/:id", getById);

couriersRouter.post("", create);

couriersRouter.delete("/:id", remove);
