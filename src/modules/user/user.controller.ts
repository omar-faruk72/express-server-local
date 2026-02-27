import { Request, Response } from "express";
import { userServices } from "./user.service";

 const createUser = async (req: Request, res: Response) => {
   const {name, email} = req.body;

   try{
    const result = await userServices.createUser(name, email)
    res.status(201).json({
        success: true,
        message: "data insaded fusseccefully",
        data: result.rows[0]
    });
   }
   catch(err: any) {
    res.status(500).json({
        success: false,
        message: err.message,
    });
   }
};

const getAllUser =  async (req: Request, res:Response) => {

    try{
        const result = await userServices.getAllUser();
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
};

export const userControllers = {
    createUser,
    getAllUser,
}