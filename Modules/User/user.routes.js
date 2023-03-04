import { Router } from "express";
import { auth } from "../../Middleware/authentication.js";
import { validation } from "../../Middleware/validation.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import * as userController from './user.controller.js'
import { LoginValidation, SignUpValidation, updateUserValidation } from "./user.validation.js";
const router = Router();

router.post("/Signup",validation(SignUpValidation),asyncHandler(userController.signup));
router.post("/Login",validation(LoginValidation),asyncHandler(userController.Login));
router.get("/LogOut",auth(),userController.LogOut);
router.get("/",auth(),userController.getUser);
router.put("/update",validation(updateUserValidation),auth(),userController.updateUser)
router.delete("/",auth(),userController.deleteUser);

export default router;