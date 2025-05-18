import express from "express"
import cors from "cors"
// import the routes 
import { healthCheck } from "./controllers/healthCheck.js"
import router from "./routes/healthcheck.js"
const app =  express()

app.use(cors({
    origin:process.env.cors_origin,
    credentials:true
}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))

// routes
app.use("/api/v1/healthcheck",healthCheck)

export {app}