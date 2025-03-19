import Status from "../models/status.model.js";
import cloudinary from "../lib/cloudinary.js";

export const uploadStatus = async (req, res) => {
  try {
    const { media, caption } = req.body;
    const userId = req.user._id;

    if (!media) {
      return res.status(400).json({ message: "Media file is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(media, {
      resource_type: "auto"
    });

    const status = new Status({
      userId,
      media: uploadResponse.secure_url,
      caption
    });

    await status.save();

    res.status(201).json(status);
  } catch (error) {
    console.log("Error in uploadStatus controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStatuses = async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const statuses = await Status.find({
      createdAt: { $gte: twentyFourHoursAgo }
    }).populate("userId", "fullName profilePic");

    res.status(200).json(statuses);
  } catch (error) {
    console.log("Error in getStatuses controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const viewStatus = async (req, res) => {
  try {
    const { statusId } = req.params;
    const userId = req.user._id;

    const status = await Status.findById(statusId);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }

    // Add viewer if not already viewed
    if (!status.views.some(view => view.userId.equals(userId))) {
      status.views.push({ userId });
      await status.save();
    }

    res.status(200).json(status);
  } catch (error) {
    console.log("Error in viewStatus controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};