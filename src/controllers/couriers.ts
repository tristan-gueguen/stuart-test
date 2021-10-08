import { NextFunction, Response, Request } from "express";
import { MyDb } from "../datasources";
import { Courier } from "../models/couriers";

const db = MyDb.Instance;

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(db.getAll());
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = db.getById(parseInt(id));
  if (!result) {
    return res.status(404).send(`courier with id=${id} could not be found.`);
  }
  return res.status(200).json(result);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { id, max_capacity } = req.body;
  if (db.exists(id)) {
    return res.status(400).send(`courier with id=${id} already exists!`);
  }
  const newCourier = new Courier(id, max_capacity);
  db.add(newCourier);
  return res.status(200).json(newCourier);
};

export default { getAll, getById, create };
