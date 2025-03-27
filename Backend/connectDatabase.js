import mongoose from "mongoose"



export const connectDatabase = async () => {
    try {
            mongoose.connect(process.env.DB_URI)
            .then(() => {
                console.log('Database connected')   
            })
    } catch (error) {
            console.log(error)
    }
}