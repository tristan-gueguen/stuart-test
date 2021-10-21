# Stuart couriers API

## Explanation

This project is a basic CRUD API to maintain a list of **Couriers**. Courier type is defined in `src\models\couriers.ts`.

Routes are defined in `src\routes\couriers.ts`. They call relevant controller methods defined in `src\controllers\couriers.ts`.

For the database part, I decided to simply write a class **MyDb** defined in `src\datasources\index.ts` that maintain a Map indexed on Couriers ids. When the server is launched, the database is init with a list of couriers defined in `src\datasources\Data.json`. Data is therefore not persisted when the server is stopped.

On top of the basic CRUD endpoints, we also have a `/couriers/lookup` endpoint that allows the user to send a query (with a **capacity_required** parameter) and to get back a list of couriers suited for the job, and their scores. The logic of how to compute a score for each courier based on a query is done by the Engine located in `src\engine\index.ts`.

## Score Computation

When a lookup query arrives, the engine computes a score for each courier. A negative score is eliminatory (the courier will not appear in the reply). Positive scores are between 0.0 and 1.0, 1.0 being a perfect score. I tried to design it so that it could handle more complex models for Couriers in the future, and more complex lookup queries.

With the current model, a query only asks for a **capacity_required** parameter. All couriers with **max_capacity** less than **capacity_required** will have a negative score. For the couriers able to do the job, my idea was to give the better score to couriers with **max_capacity** closer to **capacity_required**, so that big capacities couriers are still available in case a bigger **capacity_required** query arrives later on.

## Run locally

```sh
npm install
npm run dev
```

It should be running on [localhost:5050](http://localhost:5050/).

## Environment Variables

You can set up some env variables in the .env file:

- PORT

## Try it

You can run example queries located in _test.http_ file with the **REST Client VSCode** extension .

**Get List of all couriers**

> GET http://localhost:5050/couriers HTTP/1.1

This will send an array with all the couriers

**Get a Single Courier**

> GET http://localhost:5050/couriers/2 HTTP/1.1

This will send a JSON representing a single courier.

**Create a Courier**

> POST http://localhost:5050/couriers HTTP/1.1
>
> content-type: application/json
>
> {  "id": 1234,
>
>   "max_capacity": 75}

This adds a new Courier in the list. The id must not exist already.

**Update a Courier capacity**

PUT http://localhost:5050/couriers/1234 HTTP/1.1

> content-type: application/json
>
> {  "max_capacity": 158}

This will update the max_capacity of a Courier that already exists.

**Delete a Courier**

> DELETE http://localhost:5050/couriers/1234 HTTP/1.1

**Get Candidates couriers for a Query**

> POST http://localhost:5050/couriers/lookup HTTP/1.1
>
> content-type: application/json
>
> {  "capacity_required": 62}

This will send back a sorted array of Couriers Scores. A Courier Score simply aggregates a Courier and its score. The scoring and filtering is done by the Engine.

## Tests

`npm test`will run mocha on the tests folder

I decided to only do unit tests on the `getIdsToScore` function of the Engine for this project, as I thought it was the piece of code with the most interesting logic.

## Next Steps

- Connect to a database using an ORM (sequelize for example and a MySQL database)
- Add authentication (with a JWT for instance)
- Develop the Courier model. Couriers could have different speeds, vehicule types, preferred areas, preferred hours and so on.
- With a more complex Courier model, we could have more complex queries. The Engine would need to understand how to read these more complex queries and how to score couriers based on the parameters.
- We could have a swagger docs for our API.
- Integration tests
