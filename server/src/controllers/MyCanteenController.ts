import { Request, Response } from "express";
import Canteen from "../models/canteen";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Order from "../models/order";

const getMyCanteen = async (req: Request, res: Response) => {
  try {
    const canteen = await Canteen.findOne({ user: req.userId });
    if (!canteen) {
      return res.status(404).json({ message: "canteen not found" });
    }
    res.json(canteen);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching canteen" });
  }
};

const createMyCanteen = async (req: Request, res: Response) => {
  try {
    const existingCanteen = await Canteen.findOne({ user: req.userId });

    if (existingCanteen) {
      return res
        .status(409)
        .json({ message: "User canteen already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const canteen = new Canteen(req.body);
    canteen.imageUrl = imageUrl;
    canteen.user = new mongoose.Types.ObjectId(req.userId);
    canteen.lastUpdated = new Date();
    await canteen.save();

    res.status(201).send(canteen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyCanteen = async (req: Request, res: Response) => {
  try {
    const canteen = await Canteen.findOne({
      user: req.userId,
    });

    if (!canteen) {
      return res.status(404).json({ message: "canteen not found" });
    }

    canteen.canteenName = req.body.canteenName;
    canteen.faculty = req.body.faculty;
    canteen.cluster = req.body.cluster;
    canteen.deliveryPrice = req.body.deliveryPrice;
    canteen.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    canteen.cuisines = req.body.cuisines;
    canteen.menuItems = req.body.menuItems;
    canteen.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      canteen.imageUrl = imageUrl;
    }

    await canteen.save();
    res.status(200).send(canteen);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyCanteenOrders = async (req: Request, res: Response) => {
  try {
    const canteen = await Canteen.findOne({ user: req.userId });
    if (!canteen) {
      return res.status(404).json({ message: "canteen not found" });
    }

    const orders = await Order.find({ canteen: canteen._id })
      .populate("canteen")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const canteen = await Canteen.findById(order.canteen);

    if (canteen?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to update order status" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  updateOrderStatus,
  getMyCanteenOrders,
  getMyCanteen,
  createMyCanteen,
  updateMyCanteen,
};
