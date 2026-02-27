import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());
// data base initializing
initDB();

// logger middleware
app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello Next Lavel Web Development')
})

// localhos:8000/users
app.use("/users", userRoutes)

app.put('/users/:id', async (req: Request, res: Response) => {
    const {name, email}= req.body;

    try{
        const result = await pool.query(`
            UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
            `, [name, email, req.params.id]);
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
});

app.delete('/users/:id', async(req: Request, res: Response) => {

    try{
        const result = await pool.query(`
            DELETE FROM users WHERE id =$1
            `, [req.params.id]);
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
});

// todos 
app.post('/todos', async(req: Request, res: Response) => {
    const {user_id, title} = req.body;

    try{
        const result = await pool.query(`
            INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *
            `, [user_id, title]);
            res.status(201).json({
                success: true,
                message: "todo created",
                data: result.rows[0]
            })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

app.get('/todos', async(req: Request, res: Response) => {
    try{
        const result = await pool.query(`
            SELECT * FROM todos
            `);
            res.status(200).json({
                success: true,
                message: "todos data successfully get",
                data: result.rows
            })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});
app.get('/todos/:id', async(req: Request, res: Response) => {
    try{
        const result = await pool.query(`
            SELECT * FROM todos WHERE id = $1
            `, [req.params.id]);
            res.status(200).json({
                success: true,
                message: "todos successfully get",
                data: result.rows[0]
            })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});
app.put('/todos/:id', async(req: Request, res: Response) => {
    const { user_id, title} = req.body;
    try{
        const result = await pool.query(`
             UPDATE todos SET user_id=$1, title=$2 WHERE id=$3 RETURNING *
            `, [user_id, title, req.params.id]);
            if(result.rows.length === 0){
                res.status(404).json({
                    success: false,
                    message: "todos not found"
                });
            }else{
                res.status(200).json({
                    success: true,
                    message: "todos successfully update",
                    data: result.rows[0]
                })
            }
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
