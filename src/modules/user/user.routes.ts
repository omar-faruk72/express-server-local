import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = Router();

// localhos:8000/users
// app.use(/users/userRouter)
router.post('/', userControllers.createUser);

router.get("/", async (req: Request, res:Response) => {

    try{
        const result = await pool.query(`
            SELECT * FROM users
            `);
            res.status(200).json({
                success: true,
                message: "users data successfully get",
                data: result.rows,
            })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

export const userRoutes = router;