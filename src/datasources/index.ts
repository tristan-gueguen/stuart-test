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

  getById(id: number): Courier | undefined {
    return this.couriers.get(id);
  }

  getAll(): Courier[] {
    return Array.from(this.couriers.values());
  }

  add(courier: Courier) {
    this.couriers.set(courier.id, courier);
  }

  exists(id: number): boolean {
    return this.couriers.has(id);
  }

  remove(id: number): boolean {
    return this.couriers.delete(id);
  }
}
