import { Request, Response } from "express";
import { authService } from "./auth.service"

const userLogin = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try{
        const result = await authService.userLogin(email, password);
        res.status(200).json({
            success: true,
            message: "user login successfully and token created",
            data: result,
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};
export const authControllers = {
    userLogin,
}