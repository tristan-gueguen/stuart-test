import { Courier, CourierScore, IDCourier } from "../models/couriers";

// This method takes an array of couriers and a criteria object as input
// It returns an array of couriers sorted by score (and filtered out)

export const getIdsToScore = (
  couriers: Courier[],
  criteria: any
): CourierScore[] => {
  // creates a map that for every couriers id store his score
  const idsToScores = couriers.reduce(function (
    map: Map<IDCourier, number>,
    courier: Courier
  ) {
    map.set(courier.id, computeScoreCourier(courier, criteria));
    return map;
  },
  new Map<IDCourier, number>());

  // filter out couriers with negative score
  const positiveCouriers = couriers.filter(
    ({ id }) => idsToScores.get(id)! >= 0
  );

  // sort by score
  positiveCouriers.sort(
    (a: Courier, b: Courier) => idsToScores.get(b.id)! - idsToScores.get(a.id)!
  );

  return positiveCouriers.map((courier) => {
    return {
      courier,
      score: idsToScores.get(courier.id)!,
    };
  });
};

/*
  A score will be -1 if we want to discard a courier
  and between 0.0 and 1.0 for others, 1.0 being the best
  */
const computeScoreCourier = (courier: Courier, input: any): number => {
  // if we don't know how to read input, we'll say score is max_capacity
  // so that we see biggest capacities first
  const default_score = courier.max_capacity;

  // for now we only check if there is capacity_required in input
  if (!input.capacity_required) {
    return default_score;
  }

  // it needs to be a positive number
  // if it's 0 it's like there's no capacity required
  const capacity_required = parseFloat(input.capacity_required);
  if (!capacity_required || capacity_required <= 0) {
    return default_score;
  }

  // courier can't do the job, we give a negative score
  if (courier.max_capacity < capacity_required) {
    return -1;
  }

  // amongst those who can do the job, let's prioritize those with
  // max_capacity closest to capacity_required
  // this way, we should minimize unused capcity amongst couriers

  // let's still give a decent score to potential couriers
  const MIN_SCORE = 0.4;
  return Math.max(
    1.0 - (courier.max_capacity - capacity_required) / capacity_required,
    MIN_SCORE
  );
};
