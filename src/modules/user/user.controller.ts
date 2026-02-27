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

const getSingleUser = async(req: Request, res: Response) => {
  
    try{
        const result = await userServices.getSingleUser(req.params.id as string);
        if(result.rows.length === 0 ) {
            res.status(404).json({
                success: false,
                masses: "user not found"
            });
        }else{
            res.status(200).json({
                success: true,
                massage: "user get successfully",
                data: result.rows[0]
            });
        }
    }catch(err: any){
        res.status(500).json({
            success: false,
            massage: err.message
        })
    }

};

const updateUser = async (req: Request, res: Response) => {
    const {name, email}= req.body;

    try{
        const result = await userServices.updateUser(name, email, req.params.id as string);
            if(result.rows.length === 0 ) {
                res.status(404).json({
                    success: false,
                    message: "user not found"
                });
            }else{
                res.status(200).json({
                    success: true,
                    message: "user update successfully",
                    data: result.rows[0]
                });
            };
    }catch (err: any){
        res.status(500).json({
            success: false,
            message: err.massage,
            ditails: err
        })
    }
};

const deleteUser = async(req: Request, res: Response) => {
    try{
       const result = await userServices.deleteUser(req.params.id as string);
            if(result.rowCount === 0) {
                res.status(404).json({
                    seccess: false,
                    message: "user not found"
                });
            }else{
                res.status(200).json({
                    success: true,
                    message: "user successfully deletet",
                    data: null
                })
            }
    }catch (err: any){
        res.status(500).json({
            seccess: false,
            message: err.message
        })
    }
}

export const userControllers = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
}