import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected){
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "share_prompt",
        })

        isConnected = true;
    } catch (error) {
        
    }
}