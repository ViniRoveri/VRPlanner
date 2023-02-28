import { loadingEvent, markerColors } from "@/common/globalConstants"
import { useSelectedDate } from "@/common/hooks"
import { UserEvent } from "@/common/types"
import {PencilSquareIcon} from '@heroicons/react/24/solid'
import { useRouter } from "next/router"

type Props = {
   event: UserEvent
   monthDisplay?: number
   scope: 'day' | 'month' | 'edit'
}

const stylesContainer = `flex flex-wrap items-center justify-start mb-1 text-[20px]
sm:text-[24px]
md:text-[28px]`
const stylesMarker = `h-4 inline-block mr-2 rounded-full w-4`
const stylesP = `inline-block ml-2`
const stylesIcon = `cursor-pointer h-5 ml-2 w-5
sm:h-6 sm:w-6
md:h-7 md:w-7`

export default function EventCard({event, monthDisplay, scope}:Props){
   const router = useRouter()
   const selectedDate = useSelectedDate()

   const formattedEventDate = getFormattedEventDate()
   const formattedEventTime = getFormattedEventTime()

   function getFormattedEventDate(){
      const eventDate = new Date(event.date)

      const eventDay = eventDate.getDate()
      const eventMonthIndex = eventDate.getMonth()
      let eventMonth = eventMonthIndex + 1

      if(monthDisplay){
         eventMonth = monthDisplay
      }else if(event.repeatMonthly){
         const selectedMonthIndex = selectedDate.getMonth()
         const selectedMonth = selectedMonthIndex + 1

         eventMonth = selectedMonth
      }

      const formattedDay = eventDay.toString().padStart(2, '0')
      const formattedMonth = eventMonth.toString().padStart(2, '0')

      const formattedEventDate = `${formattedDay}/${formattedMonth}`

      return formattedEventDate
   }

   function getFormattedEventTime(){
      const eventDate = new Date(event.date)
      const eventHour = eventDate.getHours()
      const eventMinutes = eventDate.getMinutes()
   
      const formattedHour = eventHour.toString().padStart(2, '0')
      const formattedMinutes = eventMinutes.toString().padStart(2, '0')
   
      const formattedEventTime = `${formattedHour}:${formattedMinutes}`

      return formattedEventTime
   }

   function handleIconClick(){
      if(monthDisplay){
         router.push(
            `/event/edit/${event._id}?md=${monthDisplay}`
         )
      }else{
         router.push(
            `/event/edit/${event._id}`
         )
      }
   }

   return (
      <li className={stylesContainer}>
         <span className={stylesMarker} style={{backgroundColor: markerColors[event.color]}}/>
         
         <p>- {event.name}</p>
         
         {event !== loadingEvent &&
         <>
            {scope !== 'day' &&
               <p className={stylesP}>{formattedEventDate}</p>
            }

            {!event.allDay &&
               <p className={stylesP}>{formattedEventTime}h</p>
            }

            {scope !== 'edit' &&
               <PencilSquareIcon className={stylesIcon} onClick={handleIconClick}/>
            }
         </>
         }
      </li>
   )
}