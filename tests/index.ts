// import { getIdsToScore } from "../src/engine";
// import { Courier } from "../src/models/couriers";

import { Courier } from "../src/models/couriers";
import { getIdsToScore } from "../src/engine";

const assert = require("assert");

const testCouriers: Courier[] = [
  {
    id: 1,
    max_capacity: 1,
  },
  {
    id: 2,
    max_capacity: 50,
  },
  {
    id: 3,
    max_capacity: 60,
  },
  {
    id: 4,
    max_capacity: 100,
  },
  {
    id: 5,
    max_capacity: 100,
  },
  {
    id: 6,
    max_capacity: 175,
  },
  {
    id: 7,
    max_capacity: 200,
  },
];

const toughJobCriteria = {
  capacity_required: 1000,
};

const easyJobCriteria = {
  capacity_required: 1,
};

describe("Engine", function () {
  describe("#getIdsToScore()", () => {
    it("should return empty array if no couriers are able to do the job", function () {
      const res = getIdsToScore(testCouriers, toughJobCriteria);
      assert.equal(res.length, 0);
    });

    it("should return all couriers if job can be done by every couriers", function () {
      const res = getIdsToScore(testCouriers, easyJobCriteria);
      assert.equal(res.length, 7);
    });

    it("if a courier has the exact capacity it should have a score of 1.0", function () {
      const res = getIdsToScore(testCouriers, easyJobCriteria);
      assert.equal(res[0].score, 1);
    });

    it("courier with biggest capacity should have the lowest score", function () {
      const res = getIdsToScore(testCouriers, easyJobCriteria);
      assert.equal(res[res.length - 1].courier.id, 7);
    });
  });
});
