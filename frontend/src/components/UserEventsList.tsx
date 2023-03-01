import { months } from "@/common/globalConstants";
import { useSelectedDate, useSetSelectedDate } from "@/common/hooks";
import { UserEvent } from "@/common/types";
import eventsServices from "@/services/eventsServices";
import { useEffect, useState } from "react";
import MonthEventsList from "./MonthEventsList";

type Props = {
   isHomePage?: boolean
}

const stylesContainer = `mt-4 w-full`
const stylesMonthContainer = `border-b pb-2`
const stylesMonthName = `inline-block relative text-[28px]
sm:text-[32px]
md:text-[36px]`
const stylesSelectedMonth = `!text-default-white
dark:!text-default-black
after:absolute after:bg-default-blue after:h-[90%] after:inline-block after:-left-2 after:skew-y-3 after:top-[50%] after:-translate-y-[50%] after:w-[calc(100%+16px)] after:-z-10
dark:after:bg-default-beige`

export default function UserEventsList({isHomePage}:Props){
   const selectedDate = useSelectedDate()
   const setSelectedDate = useSetSelectedDate()

   const [allRepeatEvents, setAllRepeatEvents] = useState<UserEvent[]>([])
   const [allUserEvents, setAllUserEvents] = useState<UserEvent[]>([])
   const [selectedYearEvents, setSelectedYearEvents] = useState<UserEvent[]>([])

   function handleMonthClick(monthIndex:number){
      if(isHomePage){
         const selectedYear = selectedDate.getFullYear()

         setSelectedDate(selectedYear, monthIndex, 1)
      }
   }

   async function updateAllUserEvents(){
      const userEvents = await eventsServices.getAllUserEvents()

      setAllUserEvents(userEvents)
   }

   async function updateAllRepeatEvents(){
      const allRepeatEvents = eventsServices.getAllRepeatMonthlyEvents(allUserEvents)

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
            const isSelectedMonth = selectedDate.getMonth() === index

            const selectedMonthEvents = selectedYearEvents.filter(event=>{
               const eventDate = new Date(event.date)
               const eventMonth = eventDate.getMonth()

               return eventMonth === index
            })

            const allMonthEvents = [...selectedMonthEvents, ...allRepeatEvents]

            const sortedMonthEvents = eventsServices.sortEventArray(allMonthEvents)

            return (
               <div className={stylesMonthContainer} key={month}>
                  <h3 className={
                     `${stylesMonthName} ${isHomePage ? 'cursor-pointer' : ''} ${isHomePage && isSelectedMonth ? stylesSelectedMonth : ''}`
                  } onClick={()=>handleMonthClick(index)}>
                     {month}
                  </h3>

                  <MonthEventsList allMonthEvents={sortedMonthEvents} monthIndex={index}/>
               </div>
            )
         })}
      </section>
   )
}