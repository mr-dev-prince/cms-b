import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      console.log("All fields required");
      return res
        .status(400)
        .json(
          ApiResponse.error(
            "FAIL",
            "All fields required",
            "User Registration error"
          )
        );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            "FAIL",
            "User Already Exists",
            "User registration Error"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json(ApiResponse.success("OK", user, "User Created!"));
  } catch (error) {
    return res
      .status(500)
      .json(
        ApiResponse.error(
          "FAIL",
          "Failed to create user. Please try again",
          error
        )
      );
  }
};
