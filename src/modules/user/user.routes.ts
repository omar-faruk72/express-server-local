import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = Router();

// localhos:8000/users
// app.use(/users/userRouter)
router.post('/', userControllers.createUser);

router.get("/", userControllers.getAllUser);

export const userRoutes = router;