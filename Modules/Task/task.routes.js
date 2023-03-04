import { Router } from "express";
import { auth } from "../../Middleware/authentication.js";
import { validation } from "../../Middleware/validation.js";
import * as taskController from './task.controller.js'
import { createTaskValidation, deleteTaskValidation, deletSelectedTaskValidation, updateTaskValidation } from "./task.validation.js";
const router = Router();

router.post("/", auth(), validation(createTaskValidation), taskController.createTask);
router.get("/",auth(), taskController.getUserTask);
router.put("/update/:taskId",auth(),validation(updateTaskValidation),taskController.updateTask);
router.put("/all/completed",auth(), taskController.markTasksCompleted);
router.delete("/:taskId",auth(),validation(deleteTaskValidation), taskController.deleteTask);
router.delete("/delete/selectedTasks",auth(),validation(deletSelectedTaskValidation), taskController.deleteSelectedTasks);
router.delete("/",auth(), taskController.clearUserTasks);

export default router;