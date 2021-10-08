export class Courier {
  id: number;
  max_capacity: number;

  constructor(id: number, max_capacity: number) {
    this.id = id;
    this.max_capacity = max_capacity;
  }

  /*
  A score will be -1 if we want to discard a courier
  and between 0.0 and 1.0 for others, 1.0 being the best
  */
  computeScore(input: any): number {
    // if we don't know how to read input, we'll say score is max_capacity
    // so that we see biggest capacities first
    const default_score = this.max_capacity;

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
    if (this.max_capacity < capacity_required) {
      return -1;
    }

    // amongst those who can do the job, let's prioritize those with
    // max_capacity closest to capacity_required
    // this way, we should minimize unused capcity amongst couriers

    // let's still give a decent score to potential couriers
    const MIN_SCORE = 0.4;
    return Math.max(
      1.0 - (this.max_capacity - capacity_required) / capacity_required,
      MIN_SCORE
    );
  }
}
