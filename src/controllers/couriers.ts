import { Response, Request } from "express";
import { MyDb } from "../datasources";
import { Courier } from "../models/couriers";

const db = MyDb.Instance;

export const getAll = async (req: Request, res: Response) => {
  return res.status(200).json(db.getAll());
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = db.getById(parseInt(id));
  if (!result) {
    return res.status(404).send(`courier with id=${id} could not be found.`);
  }
  return res.status(200).json(result);
};

export const getCandidates = async (req: Request, res: Response) => {
  // body of request is an object that could have different criteria
  // to allow us to find the best candidates
  const input = req.body;

  const allCouriers = db.getAll();

  // create a map that for every couriers id store his score
  const idsToScores = allCouriers.reduce(function (
    map: Map<number, number>,
    courier: Courier
  ) {
    map.set(courier.id, courier.computeScore(input));
    return map;
  },
  new Map<number, number>());

  // filter out couriers with negative score
  const positiveCouriers = allCouriers.filter(
    ({ id }) => idsToScores.get(id)! >= 0
  );

  // sort by score
  positiveCouriers.sort(
    (a: Courier, b: Courier) => idsToScores.get(b.id)! - idsToScores.get(a.id)!
  );

  res.status(200).send(
    positiveCouriers.map((item) => {
      return {
        ...item,
        score: idsToScores.get(item.id),
      };
    })
  );
};

export const create = async (req: Request, res: Response) => {
  if (!req.body || !req.body.id || !req.body.max_capacity) {
    res.status(204).send("id and max_capacity should be provided");
    return;
  }
  const { id, max_capacity } = req.body;
  if (db.exists(parseInt(id))) {
    return res.status(400).send(`courier with id=${id} already exists!`);
  }
  const newCourier = new Courier(id, max_capacity);
  db.add(newCourier);
  return res.status(200).json(newCourier);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = db.remove(parseInt(id));
  if (!success) {
    res.status(204);
  }
  res.status(200);
};
