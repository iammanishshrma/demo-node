import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    /**
     * 1. Get token
     * 2. Decode token
     * 3. Get user from db with id using decoded token
     * 4. Add user object in req object
     * 5. next()
     */

    try {
        //#1
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        //#2
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //#3
        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken"
        );
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        //#4, #5
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
