import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import pg from "pg";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myCanteenRoute from "./routes/MyCanteenRoute";
import canteenRoute from "./routes/CanteenRoute";
import orderRoute from "./routes/OrderRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

const pool = new pg.Pool({
  user: "raditdb_owner",
  password: "sjCFz3eLy5Nl",
  host: "ep-withered-mouse-a16a68e6.ap-southeast-1.aws.neon.tech",
  port: 5432,
  database: "radit_8",
});

pool.connect()
  .then(client => {
    console.log('Connected to database!');
    client.release();
  })
  .catch(err => console.error('Unable to connect to the database:', err));

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/canteen", myCanteenRoute);
app.use("/api/canteen", canteenRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
