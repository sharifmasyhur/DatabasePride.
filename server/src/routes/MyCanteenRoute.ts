import express from "express";
import multer from "multer";
import MyCanteenController from "../controllers/MyCanteenController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyCanteenRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyCanteenController.getMyCanteenOrders
);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyCanteenController.updateOrderStatus
);

router.get("/", jwtCheck, jwtParse, MyCanteenController.getMyCanteen);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyCanteenRequest,
  jwtCheck,
  jwtParse,
  MyCanteenController.createMyCanteen
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyCanteenRequest,
  jwtCheck,
  jwtParse,
  MyCanteenController.updateMyCanteen
);

export default router;
