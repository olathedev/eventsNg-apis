import express from "express"
import { auth } from "../middlewares/auth.js"
import { createEvent, deleteEvent, discoverEvents, discoverEventsSingle, eventStats, getCreatedEventsSingle, getcreatedEvents, updateEvent, uploadImage } from "../controllers/events-controller.js"
import { createTicket, getTickets, updateTicket } from "../controllers/tickets-controller.js"

const router = express.Router()

// Unprotected routes
// Get events
router.get('/discover', discoverEvents)

// get single event
router.get('/discover/:id', discoverEventsSingle)


// protected routes, for only logged in creators
router.use(auth)
router.route('/').get(getcreatedEvents).post(createEvent)
router.route('/uploadImage').post(uploadImage)
router.route('/stats').get(eventStats)
router.route('/:id').get(getCreatedEventsSingle).patch(updateEvent).delete(deleteEvent)
router.route('/ticket/:id').post(createTicket).get(getTickets)
router.route('/ticket/:eventId/:id').patch(updateTicket)


export default router