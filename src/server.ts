import express from "express";
import { couriersRouter } from "./routes/couriers";

import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

// so we can read json in requests bodies
app.use(express.json());

// everything is located on the /couriers end point
app.use("/couriers", couriersRouter);

const PORT: any = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port=${PORT}`));
