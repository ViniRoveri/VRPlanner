import { getDatesRows } from "@/common/functions"
import { useSelectedDate, useSetSelectedDate } from "@/common/hooks"
import { UserEvent } from "@/common/types"
import eventsServices from "@/services/eventsServices"
import { useState, useEffect } from "react"

type Props = {
   stylesCalendarNodes: string
}

const stylesDaysRow = `w-full`
const stylesSelectedDay = `bg-default-blue font-bold text-default-white
dark:bg-default-beige dark:text-default-black`
const stylesDayMarker = `after:absolute after:-bottom-0.5 after:h-1.5 after:inline-block after:left-[50%] after:-translate-x-[50%] after:-skew-y-6 after:w-[90%]
sm:after:h-2`

export default function CalendarBody(props: Props){
   const styleDay = `${props.stylesCalendarNodes} cursor-pointer mb-1.5 relative rounded-full`

   const selectedDate = useSelectedDate()
   const setSelectedDate = useSetSelectedDate()

   const selectedYear = selectedDate.getFullYear()
   const selectedMonthIndex = selectedDate.getMonth()
   const selectedDay = selectedDate.getDate()

   const [datesRows, setDatesRows] = useState<{[key:string]: (Date|string)[]}>({
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: []
   })
   const [allMonthEvents, setAllMonthEvents] = useState<UserEvent[]>([])

   const datesRowsKeys = Object.keys(datesRows)

   function checkDayHaveEvent(day:number){
      const currentDayDate = new Date(selectedYear, selectedMonthIndex, day)

      const dayEvents = eventsServices.getSelectedDayEvents(allMonthEvents, currentDayDate)

      if(dayEvents.length > 0){
         const firstEventOfDay = dayEvents[0]
         const markerColor = firstEventOfDay.color

         return {
            have: true,
            markerColor: markerColor
         }
      }else{
         return {
            have: false,
            markerColor: ''
         }
      }
   }

   function getAfterBackgroundClass(markerColor:string){
      switch(markerColor){
         case('red'): return 'after:bg-marker-red'
         case('orange'): return 'after:bg-marker-orange'
         case('yellow'): return 'after:bg-marker-yellow'
         case('green'): return 'after:bg-marker-green'
         case('cyan'): return 'after:bg-marker-cyan'
         case('blue'): return 'after:bg-marker-blue'
         case('purple'): return 'after:bg-marker-purple'
      }
   }

   function getDayMarker(day:number|string){
      if(typeof day === 'number'){
         const dayHaveEventCheck = checkDayHaveEvent(day)
         const dayHaveEvent = dayHaveEventCheck.have
         const markerColor = dayHaveEventCheck.markerColor
         
         if(dayHaveEvent){
            const afterBackgroundClass = getAfterBackgroundClass(markerColor)

            const fullAfterClass = `${afterBackgroundClass} ${stylesDayMarker}`
            
            return fullAfterClass
         }else{
            return ''
         }
      }
   }

   async function updateAllMonthEvents(){
      const monthEvents = await eventsServices.getAllSelectedMonthEvents(selectedDate)

      setAllMonthEvents(monthEvents)
   }

   function updateSelectedDate(day:number){
      setSelectedDate(selectedYear, selectedMonthIndex, day)
   }

   function updateYearAndMonth(selectedYear:number, selectedMonth:number){
      const newDatesRows = getDatesRows(selectedYear, selectedMonth)
      
      setDatesRows(newDatesRows)
   }

   useEffect(()=>{
      updateYearAndMonth(selectedYear, selectedMonthIndex)

      updateAllMonthEvents()
   }, [selectedYear, selectedMonthIndex])

   return (
      <div>
         {datesRowsKeys.map(rowKey=>{
            const currentRow = datesRows[rowKey]

            return(
               <ul key={rowKey} className={stylesDaysRow}>
                  {currentRow.map((date, index)=>{
                     let day:number|string;

                     if(typeof date === 'string'){
                        day = date
                     }else{
                        day = date.getDate()
                     }

                     const isSelectedDay = day === selectedDay

                     return(
                        <li key={index} className={
                           `${styleDay} ${isSelectedDay ? stylesSelectedDay : ''} ${getDayMarker(day)}`
                        } onClick={()=>{
                           if(typeof day === 'number'){
                              updateSelectedDate(day)
                           }
                        }}>
                           {day}
                        </li>
                     )
                  })}
               </ul>
            )
         })}
      </div>
   )
}