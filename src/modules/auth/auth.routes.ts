import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/login", authControllers.userLogin);

export const authRouters = router;
