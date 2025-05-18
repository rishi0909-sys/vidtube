import { nanoid } from "nanoid";
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

const env_path = "./.env"
const JWT_REFRESH_SECRET = "JWT_REFRESH_SECRET"

if(process.env[JWT_REFRESH_SECRET]){
    console.log("JWT_REFRESH_SECRET already exists in .env file");
    process.exit(0)    
}
let endswithNewLine = false;
try {
    const content = fs.readFileSync(env_path, {encoding: "utf-8"});
    endswithNewLine = content.endsWith("\n");
} catch (error) {
    // File doesn't exist yet, which is fine
}
const token = nanoid()
const secret = endswithNewLine ?`${JWT_REFRESH_SECRET}=${token}\n`:`\n${JWT_REFRESH_SECRET}=${token}\n`
fs.appendFileSync(env_path,secret,{encoding:"utf-8"})