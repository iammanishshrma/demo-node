import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("res:", res);
    return res.status(200).json({
        message: "hi",
    });
});

export { registerUser };
