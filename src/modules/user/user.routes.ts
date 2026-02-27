import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

// localhos:8000/users
// app.use(/users/userRouter)
router.post('/', userControllers.createUser);

router.get("/", userControllers.getAllUser);

router.get("/:id", userControllers.getSingleUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;