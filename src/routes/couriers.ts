import express from "express";
import {
  getAll,
  getById,
  create,
  remove,
  getCandidates,
} from "../controllers/couriers";

export const couriersRouter = express.Router();

couriersRouter.post("/lookup", getCandidates);

couriersRouter.get("", getAll);
couriersRouter.get("/:id", getById);

couriersRouter.post("", create);

couriersRouter.delete("/:id", remove);
