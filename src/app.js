import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Used to allow cross origins
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);
//To store files on local server in /public
app.use(express.static("public"));
app.use(cookieParser());

//Routes import

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export { app };
