import { weekDays } from "@/common/globalConstants"

type Props = {
   stylesCalendarNodes: string
}

export default function CalendarHead(props: Props){
   const stylesWeekDays = `${props.stylesCalendarNodes} border-b mb-2`

   return (
      <ul>
         {weekDays.map(day=>(
            <li key={day} className={stylesWeekDays}>{day}</li>
         ))}
      </ul>
   )
}