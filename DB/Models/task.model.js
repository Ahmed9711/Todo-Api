import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ["Pending","Completed"],
        default: "Pending"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const taskModel = model("Task",taskSchema);
export default taskModel;