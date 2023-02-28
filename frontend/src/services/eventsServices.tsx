import { axiosApi } from "@/common/axiosInstances"
import { UserEvent } from "@/common/types"
import cookiesServices from "./cookiesServices"

const eventsServices = {
   async addEvent(newEvent:UserEvent){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EVENTS_SERVICES_AUTH_TOKEN
         }
      }

      await axiosApi.post(
         `event/add/${userId}`,
         newEvent,
         config
      )
   },

   async deleteEventById(eventId:number){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EVENTS_SERVICES_AUTH_TOKEN
         }
      }

      await axiosApi.delete(
         `event/remove/${eventId}/${userId}`,
         config
      )
   },

   async editEvent(editedEvent:Object, eventId:number){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EVENTS_SERVICES_AUTH_TOKEN
         }
      }

      await axiosApi.put(
         `event/edit/${eventId}/${userId}`,
         editedEvent,
         config
      )
   },

   getAllRepeatEvents(allUserEvents:UserEvent[]){
      const allRepeatEvents = allUserEvents.filter(event=> event.repeatMonthly)

      return allRepeatEvents
   },

   async getAllUserEvents(){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EVENTS_SERVICES_AUTH_TOKEN
         }
      }

      const allUserEvents = await axiosApi.get(
         `events/${userId}`,
         config
      )
      .then(res=> res.data)

      const sortedAllUserEvents = this.sortEventArray(allUserEvents)

      return sortedAllUserEvents
   },

   async getEventById(eventId:string){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EVENTS_SERVICES_AUTH_TOKEN
         }
      }

      const selectedEvent = await axiosApi.get(
         `event/${eventId}/${userId}`,
         config
      )
      .then(res=> res.data)

      return selectedEvent
   },

   getSelectedDayEvents(allMonthEvents:UserEvent[], selectedDate:Date){
      const selectedDay = selectedDate.getDate()

      const selectedDayEvents = allMonthEvents.filter(event=>{
         const eventDate = new Date(event.date)
         const eventDay = eventDate.getDate()

         return eventDay === selectedDay
      })

      return selectedDayEvents
   },

   async getAllSelectedMonthEvents(selectedDate:Date){
      const selectedMonthIndex = selectedDate.getMonth()
      const selectedYear = selectedDate.getFullYear()

      const allUserEvents:UserEvent[] = await this.getAllUserEvents()

      const selectedMonthEvents = allUserEvents.filter(event=>{
         const eventDate = new Date(event.date)
         const eventMonthIndex = eventDate.getMonth()
         const eventYear = eventDate.getFullYear()

         return eventMonthIndex === selectedMonthIndex 
         && selectedYear === eventYear 
         && !event.repeatMonthly
      })

      const allRepeatEvents = this.getAllRepeatEvents(allUserEvents)

      const allMonthEvents = [...selectedMonthEvents, ...allRepeatEvents]

      const sortedMonthEvents = this.sortEventArray(allMonthEvents)

      return sortedMonthEvents
   },

   getSelectedYearEvents(allUserEvents:UserEvent[], selectedDate:Date){
      const selectedYear = selectedDate.getFullYear()

      const selectedYearEvents = allUserEvents.filter(event=>{
         const eventDate = new Date(event.date)
         const eventYear = eventDate.getFullYear()

         return eventYear === selectedYear && !event.repeatMonthly
      })

      const sortedYearEvents = this.sortEventArray(selectedYearEvents)

      return sortedYearEvents
   },

   sortEventArray(eventArray:UserEvent[]){
      const sortedEventArray = eventArray.sort((a,b)=>{
         const aDate = new Date(a.date)
         const bDate = new Date(b.date)

         const aDay = aDate.getDate()
         const bDay = bDate.getDate()

         const aHour = aDate.getHours()
         const bHour = bDate.getHours()
         
         const aMinutes = aDate.getMinutes()
         const bMinutes = bDate.getMinutes()

         const sortDay = sortEventsFunction(aDay, bDay)
         if(sortDay !== 0){
            return sortDay
         }

         const sortHour = sortEventsFunction(aHour, bHour)
         if(sortHour !== 0){
            return sortHour
         }
         
         const sortMinutes = sortEventsFunction(aMinutes, bMinutes)
         if(sortMinutes !== 0){
            return sortMinutes
         }

         return -1
      })

      return sortedEventArray
   }
}

export default eventsServices

function sortEventsFunction(a:number, b:number){
   if(a > b){
      return 1
   }
   
   if(a < b){
      return -1
   }
   
   return 0
}