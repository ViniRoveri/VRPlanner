import { UserEvent } from "@/common/types"
import EventCard from "./UserEventsParts/EventCard"

type Props = {
   allMonthEvents: UserEvent[]
   monthIndex: number
}

export default function MonthEventsList(props:Props){
   const monthDisplay = props.monthIndex + 1

   return (
      <ul>
         {props.allMonthEvents.map(event=>{
            return(
               <EventCard event={event} key={event._id} monthDisplay={event.repeatMonthly ? monthDisplay : undefined} scope={'month'}/>
            )
         })}
      </ul>
   )
}