import mongoose from "mongoose";
import fs from "fs";
import { ENV } from "../configs/constant.js";

export const connectDB = () => {
    const MongoDBurl = ENV.MONGO_URL;
    mongoose
        .connect(MongoDBurl)
        .then(() => {
            if(ENV.APP_ENV==="development")
                console.log(`Successfully connected to the database!`);
        })
        .catch((error) => {
            if(ENV.APP_ENV==="development")
                console.log(`Error in connecting to the database, Error : ${error}`);
            else{
                var errorLog = fs.createWriteStream('./logs/error.log', { flags: 'a' });
            	const log = `[${new Date().toISOString()}] ${500} - Error in connecting to the database, Error : ${error}`;
	            errorLog.write(log + '\n');
            }
        });
};