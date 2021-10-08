import http from "http";
import express, { Express } from "express";
import routes from "./routes/couriers";

const app: Express = express();

app.use(express.json());

app.use("/", routes);

const httpServer = http.createServer(app);
const PORT: any = process.env.PORT || 5050;
httpServer.listen(PORT, () => console.log(`Server running on port=${PORT}`));
