import { Request, Response } from "express";
import Canteen from "../models/canteen";

const getCanteen = async (req: Request, res: Response) => {
  try {
    const canteenId = req.params.canteenId;

    const canteen = await Canteen.findById(canteenId);
    if (!canteen) {
      return res.status(404).json({ message: "canteen not found" });
    }

    res.json(canteen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const searchCanteen = async (req: Request, res: Response) => {
  try {
    const faculty = req.params.faculty;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["faculty"] = new RegExp(faculty, "i");
    const facultyCheck = await Canteen.countDocuments(query);
    if (facultyCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { canteenName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastUpdated"
    const canteens = await Canteen.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Canteen.countDocuments(query);

    const response = {
      data: canteens,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getCanteen,
  searchCanteen,
};
