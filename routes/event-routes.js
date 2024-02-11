import express from "express"
import { auth } from "../middlewares/auth.js"
import { createEvent, deleteEvent, discoverEvents, discoverEventsSingle, getCreatedEventsSingle, getcreatedEvents, updateEvent } from "../controllers/events-controller.js"

const router = express.Router()

// Unprotected routes
// Get events
router.get('/discover', discoverEvents)

// get single event
router.get('/discover/:id', discoverEventsSingle)


// protected routes, for only logged in creators
router.route('/').get(getcreatedEvents).post(createEvent)
router.route('/:id', auth).get(getCreatedEventsSingle).patch(updateEvent).delete(deleteEvent)


export default router