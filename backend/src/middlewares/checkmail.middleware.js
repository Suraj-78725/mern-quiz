import { ApiResponse } from "../utils/ApiResponse.js";

const allowedEmails = ["vighnupawar2004@gmail.com"];

export const checkAllowedEmail = (req, res, next) => {
  const userEmail = req.user.email;
  // console.log(userEmail);
  // console.log(req.user);
  if (!allowedEmails.includes(userEmail)) {
    return res.status(403).json(new ApiResponse(403, "Sorry"));
  }
  next();
};
