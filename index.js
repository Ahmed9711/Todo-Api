import express from 'express'
import { config } from 'dotenv';
import * as Routers from './Modules/index.routes.js'
import { ConnectionDB } from './DB/connection.js';
import { stackVar } from './utils/errorHanding.js';
config({path:'./utils/setup.env'});
const app = express();
const port = process.env.PORT;
const BaseURL = "/todo";
app.use(express.json());
ConnectionDB();

app.use(`${BaseURL}/user`,Routers.userRouter);
app.use(`${BaseURL}/task`,Routers.taskRouter);

app.use((err,req,res,next) => {
    if(err){
        // console.log(err);
        res.status(err['cause'] || 500).json({
            message: "Catch Error",
            Error: err.message,
            stack: stackVar
        })
    }
})

app.listen(port, () => console.log(`Todo app listening on port ${port}!`))