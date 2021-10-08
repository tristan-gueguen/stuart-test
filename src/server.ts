import express from "express";
import { couriersRouter } from "./routes/couriers";

const app = express();

app.use(express.json());
app.use("/couriers", couriersRouter);

const PORT: any = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port=${PORT}`));
