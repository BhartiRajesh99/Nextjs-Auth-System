import mongoose from "mongoose";

async function connectDB(){
    try {
        const instance = await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected',() => {
            console.log(`Connection Successful: ${instance.connection.host}`)
        })

        connection.on('error', (err) => {
            console.log("Error Occured in DB Connection : ",err)
            process.exit(1);
        })
    } catch (error) {
        console.log("Some Error Occured in DB Connection : ",error)
    }
}

export default connectDB
