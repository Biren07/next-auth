import mongoose from "mongoose";
export async function connectDb()
{
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDb connection sucessfully ');
            
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error . please make sure MongoDb is running.'+ err);
            process.exit();
        })
    } catch (error) {
         console.log("something goes worng.");
         console.log(error);
    }
}