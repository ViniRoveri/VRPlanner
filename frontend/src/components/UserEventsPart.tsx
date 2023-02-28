import { loadingEvent } from "@/common/globalConstants";
import { useSelectedDate } from "@/common/hooks";
import { UserEvent } from "@/common/types";
import eventsServices from "@/services/eventsServices";
import { useEffect, useState } from "react";
import SeeAllEventsButton from "./SeeAllEventsButton";
import DayEvents from "./UserEventsParts/DayEvents";
import MonthEvents from "./UserEventsParts/MonthEvents";

const dividingLineHeight = '36px'

export default function UserEventsPart(){
   const selectedDate = useSelectedDate()

   const selectedMonth = selectedDate.getMonth()

   const [allDayEvents, setAllDayEvents] = useState<UserEvent[]>([loadingEvent])
   const [allMonthEvents, setAllMonthEvents] = useState<UserEvent[]>([loadingEvent])

   async function updateSelectedMonthEvents(){
      const selectedMonthEvents = await eventsServices.getAllSelectedMonthEvents(selectedDate)

      setAllMonthEvents(selectedMonthEvents)
   }

   async function updateSelectedDayEvents(){
      const selectedDayEvents = eventsServices.getSelectedDayEvents(allMonthEvents, selectedDate)

      setAllDayEvents(selectedDayEvents)
   }

   useEffect(()=>{
      setAllMonthEvents([loadingEvent])
      
      updateSelectedMonthEvents()
   }, [selectedMonth])

   useEffect(()=>{
      if(allMonthEvents[0] !== loadingEvent){
         updateSelectedDayEvents()
      }else{
         setAllDayEvents([loadingEvent])
      }
   }, [selectedDate, allMonthEvents])

   return (
      <section style={{marginTop: dividingLineHeight}}>
         <DayEvents allDayEvents={allDayEvents}/>

         <MonthEvents allMonthEvents={allMonthEvents}/>

         <SeeAllEventsButton/>
      </section>
   )
}