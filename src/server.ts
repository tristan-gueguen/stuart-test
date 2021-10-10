import express from "express";
import { couriersRouter } from "./routes/couriers";

const app = express();

// so we can read json in requests bodies
app.use(express.json());

// everything is located on the /couriers end point
app.use("/couriers", couriersRouter);

const PORT: any = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port=${PORT}`));
