// We define here that couriers are indexed with a number
// in case we want to switch to string, it should be easier
export type IDCourier = number;

// This interface represents a courier
export interface Courier {
  id: IDCourier;
  max_capacity: number;
}

// This type represents the return type of the /lookup end point
export type CourierScore = {
  courier: Courier;
  score: number;
};
