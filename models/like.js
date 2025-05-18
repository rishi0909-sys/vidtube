import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
    },
    Comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
    },
    ikedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true}) 
const Like = mongoose.model("Like",likeSchema)
export default Like