import { Courier } from "../models/couriers";
const initData: Courier[] = require("./Data.json");

export class MyDb {
  private couriers: Map<number, Courier>;
  private static _instance: MyDb;

  private constructor() {
    this.couriers = new Map();
    initData.map(({ id, max_capacity }: Courier) => {
      this.couriers.set(id, new Courier(id, max_capacity));
    });
    console.log("Database is ready!");
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  getById(id: number) {
    return this.couriers.get(id);
  }

  getAll(): Courier[] {
    console.log(this.couriers);
    return Array.from(this.couriers.values());
  }

  add(courier: Courier) {
    this.couriers.set(courier.id, courier);
  }

  exists(id: number) {
    return this.couriers.has(id);
  }
}
