import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleError } from "./common/helpers/handle-err.helper.js";
import rootRouter from "./routers/root.router.js";
import { APP } from "./common/constants/init.constants.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(rootRouter);

// Error handling middleware
app.use(handleError);

// Start server
app.listen(APP.PORT, () => {
    console.log(`✅ Server is running on port ${APP.PORT}`);
    console.log(`📡 API available at: http://localhost:${APP.PORT}`);
});
