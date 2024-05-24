import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { PORT } from "./constants.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        const port = PORT || 8000;

        app.on("error", (err) => {
            console.log("ERR: ", err);
            throw err;
        });

        app.listen(port, () => {
            `Server is running at port : ${port}`;
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed!!! ", err);
    });
