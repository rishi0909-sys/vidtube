import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { writeFileSync } from 'fs';
import jwt from "jsonwebtoken";
import {nanoid} from 'nanoid';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true,
    },
    CoverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"],
    },
    refreshToken:{
        type:String
    },
    
},{timestamps:true})

const token = nanoid()
const secret = `JWT_SECRET= ${token}\n`
writeFileSync("./.env", secret,{flag:"a"})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
    this.password =  await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAuthToken =  function(){
    jwt.sign({
        id:this._id,
        name:this.username,
        email:this.email,
        fullname:this.fullname,
    },process.env.JWT_SECRET,{
        expiresIn:JWT_ACCESS_TOKEN_EXPIRES_IN 
    })
}
userSchema.methods.generateRefreshToken =  function(){
    jwt.sign({
        id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:JWT_ACCESS_TOKEN_EXPIRES_IN 
    })
}
const User = mongoose.model("User", userSchema);
export default User;