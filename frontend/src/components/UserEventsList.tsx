import { months } from "@/common/globalConstants";
import { useSelectedDate } from "@/common/hooks";
import { UserEvent } from "@/common/types";
import eventsServices from "@/services/eventsServices";
import { useEffect, useState } from "react";
import MonthEventsList from "./MonthEventsList";

const stylesContainer = `mt-4 w-full`
const stylesMonthContainer = `border-b pb-2`
const stylesMonthName = `text-[28px]
sm:text-[32px]
md:text-[36px]`

export default function UserEventsList(){
   const selectedDate = useSelectedDate()

   const [allRepeatEvents, setAllRepeatEvents] = useState<UserEvent[]>([])
   const [allUserEvents, setAllUserEvents] = useState<UserEvent[]>([])
   const [selectedYearEvents, setSelectedYearEvents] = useState<UserEvent[]>([])

   async function updateAllUserEvents(){
      const userEvents = await eventsServices.getAllUserEvents()

      setAllUserEvents(userEvents)
   }

   async function updateAllRepeatEvents(){
      const allRepeatEvents = eventsServices.getAllRepeatEvents(allUserEvents)

      setAllRepeatEvents(allRepeatEvents)
   }

   function updateSelectedYearEvents(){
      const selectedYearEvents = eventsServices.getSelectedYearEvents(allUserEvents, selectedDate)

      setSelectedYearEvents(selectedYearEvents)
   }

   useEffect(()=>{
      updateAllUserEvents()
   }, [])

   useEffect(()=>{
      updateSelectedYearEvents()

      updateAllRepeatEvents()
   }, [allUserEvents, selectedDate])
   
   return (
      <section className={stylesContainer}>
         {months.map((month, index)=>{
            const selectedMonthEvents = selectedYearEvents.filter(event=>{
               const eventDate = new Date(event.date)
               const eventMonth = eventDate.getMonth()

               return eventMonth === index
            })

            const allMonthEvents = [...selectedMonthEvents, ...allRepeatEvents]

            const sortedMonthEvents = eventsServices.sortEventArray(allMonthEvents)

            return (
               <div className={stylesMonthContainer} key={month}>
                  <h3 className={stylesMonthName}>{month}</h3>

                  <MonthEventsList allMonthEvents={sortedMonthEvents} monthIndex={index}/>
               </div>
            )
         })}
      </section>
   )
}