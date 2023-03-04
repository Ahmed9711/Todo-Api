import taskModel from "../../DB/Models/task.model.js";

export const createTask = async (req,res) => {
    try {
        const {name, description, status} = req.body;
        const {_id} = req.user;
        const task = new taskModel({name, description, status, createdBy: _id});
        const savedTask = await task.save();
        if(savedTask){
            res.json({message:"Task Created", savedTask});
        }
        else{
            res.json({message:"Task Create failed"});
        }
    } catch (error) {
        res.json({message:"Create task error", error});
    }
}

export const getUserTask = async (req,res) => {
    try {
        const {_id} = req.user;
        const tasks = await taskModel.find({createdBy: _id});
        if(tasks.length){
            res.json({tasks});
        }
        else{
            res.json({message:"Get User tasks failed"});
        }
    } catch (error) {
        res.json({message:"Get user tasks error", error});
    }
}

export const updateTask = async (req,res) => {
    try {
        const {name, description, status} = req.body;
        const {taskId} = req.params;
        const {_id} = req.user;
        const task = await taskModel.findOneAndUpdate(
            {_id: taskId ,createdBy: _id},
            {name, description, status},
            {new: true}
        )
        if(task){
            res.json({message:"Update Done", task});
        }
        else{
            res.json({message:"Update failed"});
        }
    } catch (error) {
        res.json({message:"update task error", error});
    }
}

export const markTasksCompleted = async (req,res) => {
    try {
        const {_id} = req.user;
        const tasks = await taskModel.updateMany({ createdBy: _id},{status: "Completed"});
        if(tasks?.modifiedCount){
            res.json({message:"Mark tasks done"});
        }
        else{
            res.json({message:"Mark tasks failed"});
        }
    } catch (error) {
        res.json({message:"Mark task completed error", error});
    }
}

export const deleteTask = async (req,res) => {
    try {
        const {taskId} = req.params;
        const {_id} = req.user;
        const deletedtask = await taskModel.deleteOne({_id: taskId ,createdBy: _id});
        if(deletedtask?.deletedCount){
            res.json({message:"Delete done"});
        }
        else{
            res.json({message:"Delete failed"});
        }
    } catch (error) {
        res.json({message:"Delete task error", error});
    }
}

export const deleteSelectedTasks = async (req,res) => {
    try {
        const {id} = req.body;
        const {_id} = req.user;
        console.log(id);
        const deleted = await taskModel.deleteMany({_id: { $in: id}, createdBy: _id})
        if(deleted?.deletedCount){
            res.json({message:"Delete select done"});
        }
        else{
            res.json({message:"Delete select failed"});
        }
    } catch (error) {
        res.json({message:"Delete Selected tasks error", error});
    }
}

export const clearUserTasks = async (req,res) => {
    try {
        const {_id} = req.user;
        const deleted = await taskModel.deleteMany({createdBy: _id})
        if(deleted?.deletedCount){
            res.json({message:"Clear tasks done"});
        }
        else{
            res.json({message:"Clear tasks failed"});
        }
    } catch (error) {
        res.json({message:"Clear User tasks error", error});
    }
}

