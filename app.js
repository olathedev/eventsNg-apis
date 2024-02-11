import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import connect from "./db/db.js";
import authROutes from './routes/auth-routes.js'
import eventRoutes from "./routes/event-routes.js"
import { notFound } from "./middlewares/not-found.js";
import { errorhandler } from "./middlewares/error-handler.js";
import cors from 'cors'

dotenv.config()
const app = express()


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

app.use("/api/v1/eventsng/auth", authROutes)
app.use("/api/v1/eventsng/events/", eventRoutes)

app.use(notFound)
app.use(errorhandler)



