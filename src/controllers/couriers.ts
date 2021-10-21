import { Response, Request } from "express";
import { MyDb } from "../datasources";
import { getIdsToScore } from "../engine";
import { Courier, IDCourier } from "../models/couriers";

// This object represents a Singleton object that plays the role of a database connector in this project
const db = MyDb.Instance;

// returns all couriers
export const getAll = async (req: Request, res: Response) => {
  return res.status(200).json(db.getAll());
};

// returns one specific courier
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const courierId: IDCourier = parseInt(id);
  const result = db.getById(courierId);
  if (!result) {
    return res
      .status(404)
      .send(`courier with id=${courierId} could not be found.`);
  }
  return res.status(200).json(result);
};

// Created a courier
export const create = async (req: Request, res: Response) => {
  if (!req.body || !req.body.id || !req.body.max_capacity) {
    res.status(204).send("id and max_capacity should be provided");
    return;
  }
  const { id, max_capacity } = req.body;
  const courierId: IDCourier = parseInt(id);
  if (db.exists(courierId)) {
    return res.status(400).send(`courier with id=${courierId} already exists!`);
  }
  const newCourier: Courier = {
    id: courierId,
    max_capacity,
  };
  db.add(newCourier);
  return res.status(200).json(newCourier);
};

//Update a courier capacity
export const update = async (req: Request, res: Response) => {
  if (!req.body || !req.body.max_capacity) {
    res.status(204).send("id and max_capacity should be provided");
    return;
  }
  const { id } = req.params;
  const { max_capacity } = req.body;
  const courierId: IDCourier = parseInt(id);

  //check if courier exists
  if (!db.exists(courierId)) {
    return res.status(404).send(`courier with id=${courierId} does not exist!`);
  }

  const updatedCourier: Courier = {
    id: courierId,
    max_capacity,
  };
  db.add(updatedCourier);
  return res.status(200).json(updatedCourier);
};

// Delete a courier
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const courierId: IDCourier = parseInt(id);
  const success = db.remove(courierId);
  if (!success) {
    res.status(204);
  }
  res.status(200);
};

// this method calls the engine to get a list of results based on criteria in body
export const getCandidates = async (req: Request, res: Response) => {
  // body of request is an object that could have different criteria
  // to allow us to find the best candidates
  const input = req.body;

  const allCouriers = db.getAll();

  //Calls the engine
  const result = getIdsToScore(allCouriers, input);

  res.status(200).send(result);
};
