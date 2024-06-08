import express from "express";
import { param } from "express-validator";
import CanteenController from "../controllers/CanteenController";

const router = express.Router();

router.get(
  "/:canteenId",
  param("canteenId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("CanteenId paramenter must be a valid string"),
  CanteenController.getCanteen
);

router.get(
  "/search/:faculty",
  param("faculty")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Faculty paramenter must be a valid string"),
  CanteenController.searchCanteen
);

export default router;
