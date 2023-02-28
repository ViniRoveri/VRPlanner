import { months } from "@/common/globalConstants"
import { useSelectedDate } from "@/common/hooks"
import { UserEvent } from "@/common/types"
import EventCard from "./EventCard"

type Props = {
   allMonthEvents:UserEvent[]
}

const stylesContainer = `border-b`
const stylesTitle = `text-[28px]
sm:text-[32px]
md:text-[36px]`
const stylesEventList = `my-6`
const stylesWarning = `text-[22px] text-center
sm:text-[26px]
md:text-[30px]`

export default function MonthEvents(props:Props){
   const selectedDate = useSelectedDate()

   const selectedMonthIndex = selectedDate.getMonth()
   const formattedMonthAndYear = getFormattedMonthAndYear()

   function getFormattedMonthAndYear(){
      const selectedMonth = months[selectedMonthIndex]
      const selectedYear = selectedDate.getFullYear()

      const formattedMonthAndYear = `${selectedMonth} ${selectedYear}`

      return formattedMonthAndYear
   }

   return (
      <section className={stylesContainer}>
         <h2 className={stylesTitle}>{`Events of ${formattedMonthAndYear}:`}</h2>

         <ul className={stylesEventList}>
            {props.allMonthEvents.map(event=>{
               const eventDate = new Date(event.date)
               const key = eventDate.getTime()
               const monthDisplay = event.repeatMonthly ? selectedMonthIndex + 1 : undefined

               return(
                  <EventCard event={event} key={key} monthDisplay={monthDisplay} scope='month'/>
               )
            })}

            {props.allMonthEvents.length === 0 &&
               <li className={stylesWarning}>No events for this month yet...</li>
            }
         </ul>
      </section>
   )
}