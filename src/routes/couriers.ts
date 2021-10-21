import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getCandidates,
} from "../controllers/couriers";

// Let's dispatch requests to corresponding controllers methods
export const couriersRouter = express.Router();

couriersRouter.post("/lookup", getCandidates);

couriersRouter.get("", getAll);
couriersRouter.get("/:id", getById);

couriersRouter.post("", create);
couriersRouter.put("/:id", update);

couriersRouter.delete("/:id", remove);
