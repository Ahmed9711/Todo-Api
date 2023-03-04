import userModel from "../../DB/Models/user.model.js";
import bcrypt from 'bcryptjs'
import { tokenFunction } from "../../utils/tokenFunction.js";

export const signup = async (req,res,next) => {
    // try {
        const {name, email, age, password} = req.body;
        const hashedpassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        hashedpassword = 5;
        const user = new userModel({name, email, age, password: hashedpassword, isLoggedIn: true});
        const savedUser = await user.save();
        if(savedUser){
            res.status(201).json({message:"Sign Up done", savedUser});
        }
        else{
            // res.json({message:"Sign Up failed"});
            next(new Error("Sign Up failed"))
        }
    // } catch (error) {
    //     if(error.code == 11000){
    //         res.json({message:"Email already registered"});
    //     }
    //     else{
    //         res.status(500).json({message:"Sign Up error", error});
    //     }
    // }
}

export const Login = async (req,res,next) => {
    // try {
        const {email, password} = req.body;
        const userCheck = await userModel.findOne({email});
            if(userCheck){
                const match = bcrypt.compareSync(password, userCheck.password);
                if(match){
                    userCheck.isLoggedIn = true;
                    await userCheck.save();
                    const token = tokenFunction({payload: {id: userCheck._id, email: userCheck.email}})
                    res.json({message:"Login Success", token});
                }
                else{
                    // res.json({message:"In-Valid Login information"});
                    next(new Error("In-Valid Login information", {cause: 400}))
                }
            }
            else{
                next(new Error("In-Valid Login information", {cause: 400}))
            }
    // } catch (error) {
    //     res.json({message:"Login error", error});
    // }
}

export const LogOut = async (req,res) => {
    // try {
        const {_id} = req.user;
        const userLogOut = await userModel.findByIdAndUpdate(
            _id,
            {isLoggedIn: false }
        )
        if(userLogOut){
            // return boolean DestroyToken = true to the client side to delete the token
            res.json({message:"Log Out success", DestroyToken: true});
        }
        else{
            // res.json({message:"Log Out failed"});
            next(new Error("Log Out failed"))
        }
    // } catch (error) {
    //     res.json({message:"Log Out error", error});
    // }
}

export const getUser = async (req,res) => {
    try {
        const user = req.user;
        if( user){
            res.json({message: "Done", user});
        }
        else{
            res.json({message: "Invalid Id"});
        }
    } catch (error) {
        res.json({message:"Get User error", error});
    }
}

export const updateUser = async (req,res) => {
    try {
        const {name, email, age, password} = req.body;
        const {_id} = req.user;
        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        const user = await userModel.findByIdAndUpdate(
            _id,
            {name, email, age, password: hashedPassword},
            {new: true}
        )
        if(user){
            res.json({message:"Update Done", user});
        }
        else{
            res.json({message:"Update Failed"});
        } 
    } catch (error) {
        res.json({message:"Update User error", error});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const {_id} = req.user;
        const user = await userModel.deleteOne({_id});
        if( user.deletedCount){
            res.json({message: "Delete Done", user});
        }
        else{
            res.json({message: "Invalid Id"});
        }
    } catch (error) {
        res.json({message:"Delete User error", error});
    }
}