import eventsServices from "../services/eventsServices.js"
import authServices from '../services/authServices.js'

const eventsController = {
   async addEventByUserId(req,res){
      try{
         const newEvent = req.body
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
         
         await eventsServices.addEventByUserId(newEvent, selectedUserId, authToken)

         res.status(201).send('Event added sucessfully!')
      }catch(err){
         console.log(err)
         res.status(500).send('Could not add event.')
      }
   },

   async editEventById(req,res){
      try{
         const newEventData = req.body
         const selectedEventId = req.params.eventId
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
         
         await eventsServices.editEventById(newEventData, selectedEventId, selectedUserId, authToken)

         res.send('Event edited sucessfully!')
      }catch(err){
         console.log(err)
         res.status(500).send('Could not edit event.')
      }
   },

   async getEventByEventId(req,res){
      try{
         const selectedEventId = req.params.eventId
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
         
         const selectedEvent = await eventsServices.getEventByEventId(selectedEventId, selectedUserId, authToken)

         res.send(selectedEvent)
      }catch(err){
         console.log(err)
         res.status(500).send('Could not get event by id.')
      }
   },

   async getEventsByUserId(req,res){
      try{
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
         
         const selectedUserEvents = await eventsServices.getEventsByUserId(selectedUserId, authToken)

         res.send(selectedUserEvents)
      }catch(err){
         console.log(err)
         res.status(500).send('Could not get user events.')
      }
   },

   async removeEventById(req,res){
      try{
         const selectedEventId = req.params.eventId
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
         
         await eventsServices.removeEventById(selectedEventId, selectedUserId, authToken)

         res.send('Event removed sucessfully!')
      }catch(err){
         console.log(err)
         res.status(500).send('Could not remove event.')
      }
   }
}

export default eventsController