import express from "express";
const route = express.Router();
import Member from "../models/auth.model.js";

import dotnev from "dotenv";
dotnev.config();

route.post("/assign-role", async (req, res, next) => {
  const { email, requested_role } = req.body;
  try {
    const member = await Member.findOne({ email });
    if (!member)
      return res
        .status(401)
        .json({ success: false, message: "Member Not Found" });
    member.role = requested_role;
    await member.save();

    switch (newRole) {
      case "publisher":
        await Publisher.create({
          member: member._id,
          publisher_name: member.member_name,
          location: "To be updated",
        });
        break;
      case "author":
        await Author.create({
          member: member._id,
          author_name: member.member_name,
          location: "To be updated",
        });
        break;
      case "librarian":
        await Librarian.create({
          member: member._id,
          librarian_name: member.member_name,
          age: 30,
          location: "To be updated",
          joined_at: new Date(),
        });
        break;
    }

    res.status(200).json({ success: true, message: "Requested Role Assigned" });
  } catch (error) {
    next(error);
  }
});

export default route;
