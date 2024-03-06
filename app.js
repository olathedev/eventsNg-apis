import express from "express";
const app = express()
import dotenv from "dotenv"
dotenv.config()
import connect from "./db/db.js";
import fs from "fs"

// middlewares
import morgan from "morgan";
import { notFound } from "./middlewares/not-found.js";
import { errorhandler } from "./middlewares/error-handler.js";
import cors from 'cors'
import fileUpload from "express-fileupload";

// routes
import authROutes from './routes/auth-routes.js'
import eventRoutes from "./routes/event-routes.js"

// services
import { v2 as cloudinary } from "cloudinary";

       
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });



const start = async () => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}`))
    } catch (error) {
        console.log(error.message);
    }
}

start()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(fileUpload({useTempFiles: true}))

app.post('/', async (req, res) => {
    console.log('file route');
    console.log(req.files);
    const image = req.files.image.tempFilePath
    const result = await cloudinary.uploader.upload(
        image,
        {
            use_filename: true,
            folder: 'test'
        }
    )

    fs.unlinkSync(req.files.image.tempFilePath)

    res.json({image: result.secure_url})

})

app.use("/api/v1/eventsng/auth", authROutes)
app.use("/api/v1/eventsng/events/", eventRoutes)

app.use(notFound)
app.use(errorhandler)



