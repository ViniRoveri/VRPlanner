import User from "../schemas/userSchema.js"
import usersServices from "./usersServices.js"

const EVENTS_SERVICES_AUTH_TOKEN = process.env.EVENTS_SERVICES_AUTH_TOKEN

const eventsServices = {
   async addEventByUserId(newEvent, selectedUserId, authToken){
      if(authToken === EVENTS_SERVICES_AUTH_TOKEN){
         const currentEvents = await this.getEventsByUserId(selectedUserId, authToken)

         const newEventsArray = [...currentEvents, newEvent]
         
         await User.findByIdAndUpdate(
            selectedUserId,
            {
               events: newEventsArray
            }
         )
      }else{
         throw new Error('Error on Events Services: addEventByUserId')
      }
   },

   async editEventById(newEventData, selectedEventId, selectedUserId, authToken){
      if(authToken === EVENTS_SERVICES_AUTH_TOKEN){
         let eventsArray = await this.getEventsByUserId(selectedUserId, authToken)

         const selectedEventIdNumber = Number(selectedEventId)

         const selectedEventIndex = eventsArray.findIndex(event=> event._id === selectedEventIdNumber)
         const selectedEvent = eventsArray[selectedEventIndex]

         const editedEvent = {
            ...selectedEvent,
            ...newEventData
         }

         eventsArray[selectedEventIndex] = editedEvent

         await User.findByIdAndUpdate(
            selectedUserId,
            {
               events: eventsArray
            }
         )
      }else{
         throw new Error('Error on Events Services: editEventById')
      }
   },

   async getEventByEventId(selectedEventId, selectedUserId, authToken){
      if(authToken === EVENTS_SERVICES_AUTH_TOKEN){
         const selectedUserEvents = await this.getEventsByUserId(selectedUserId, authToken)

         const selectedEventIdNumber = Number(selectedEventId)

         const selectedEventArray = selectedUserEvents.filter(event=> event._id === selectedEventIdNumber)

         const selectedEvent = selectedEventArray[0]
         
         return selectedEvent
      }else{
         throw new Error('Error on Events Services: getEventByEventId')
      }
   },

   async getEventsByUserId(selectedUserId, authToken){
      if(authToken === EVENTS_SERVICES_AUTH_TOKEN){
         const USERS_SERVICES_AUTH_TOKEN = process.env.USERS_SERVICES_AUTH_TOKEN

         const selectedUser = await usersServices.getUserById(selectedUserId, USERS_SERVICES_AUTH_TOKEN)

         const selectedUserEvents = selectedUser.events
         
         return selectedUserEvents
      }else{
         throw new Error('Error on Events Services: getEventsByUserId')
      }
   },

   async removeEventById(selectedEventId, selectedUserId, authToken){
      if(authToken === EVENTS_SERVICES_AUTH_TOKEN){
         const currentEvents = await this.getEventsByUserId(selectedUserId, authToken)

         const selectedEventIdNumber = Number(selectedEventId)

         const newEventsArray = currentEvents.filter(event=> event._id !== selectedEventIdNumber)

         await User.findByIdAndUpdate(
            selectedUserId,
            {
               events: newEventsArray
            }
         )
      }else{
         throw new Error('Error on Events Services: removeEventById')
      }
   }
}

export default eventsServices