import express from 'express'
import eventsController from './controllers/eventsController.js'
import usersController from './controllers/usersController.js'

const router = express.Router()

router.get('/usernames', usersController.getAllUsernames)

router.get('/user/:userId', usersController.getUserById)

router.get('/username/:username', usersController.getUserByUsername)

router.get('/events/:userId', eventsController.getEventsByUserId)

router.get('/event/:eventId/:userId', eventsController.getEventByEventId)

router.post('/user/add', usersController.addUser)

router.post('/event/add/:userId', eventsController.addEventByUserId)

router.post('/user/login/:username', usersController.loginUser)

router.post('/user/validate', usersController.validateToken)

router.put('/user/edit/:userId', usersController.editUserById)

router.put('/event/edit/:eventId/:userId', eventsController.editEventById)

router.delete('/event/remove/:eventId/:userId', eventsController.removeEventById)

export default router
