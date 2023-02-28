import { getFormattedFullDate } from "@/common/functions"
import { useSelectedDate } from "@/common/hooks"
import { UserEvent } from "@/common/types"
import { useRouter } from "next/router"
import EventCard from "./EventCard"

type Props = {
   allDayEvents:UserEvent[]
}

const stylesContainer = `border-b pb-4`
const stylesTitle = `text-[28px]
sm:text-[32px]
md:text-[36px]`
const stylesEventList = `my-6`
const stylesWarning = `text-[22px] text-center
sm:text-[26px]
md:text-[30px]`
const stylesButton = `bg-default-blue block cursor-pointer m-auto rounded-lg text-[20px] text-center text-default-white w-[80%]
dark:bg-default-beige dark:text-default-black
active:scale-[98%]
sm:text-[24px]
md:text-[28px]`

export default function DayEvents(props:Props){
   const router = useRouter()
   const selectedDate = useSelectedDate()

   const selectedMonthIndex = selectedDate.getMonth()
   const formattedSelectedDate = getFormattedFullDate(selectedDate)
   const today = new Date()
   const formattedTodayDate = getFormattedFullDate(today)
   const selectedDateIsToday = formattedSelectedDate === formattedTodayDate
   const dateDisplay = selectedDateIsToday ? 'Today' : formattedSelectedDate

   function handleAddEvent(){
      router.push('/event/add')
   }

   return (
      <section className={stylesContainer}>
         <h2 className={stylesTitle}>{`Events of ${dateDisplay}:`}</h2>

         <ul className={stylesEventList}>
            {props.allDayEvents.map(event=>{
               const eventDate = new Date(event.date)
               const key = eventDate.getTime()
               const monthDisplay = event.repeatMonthly ? selectedMonthIndex + 1 : undefined

               return(
                  <EventCard event={event} key={key} monthDisplay={monthDisplay} scope='day'/>
               )
            })}

            {props.allDayEvents.length === 0 &&
               <li className={stylesWarning}>No events for this day yet...</li>
            }
         </ul>

         <button className={stylesButton} onClick={handleAddEvent} type="button">+ Add Event</button>
      </section>
   )
}