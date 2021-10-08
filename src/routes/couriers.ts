import express from "express";
import controller from "../controllers/couriers";

const router = express.Router();

router.get("/couriers", controller.getAll);
router.get("/couriers/:id", controller.getById);

export = router;
