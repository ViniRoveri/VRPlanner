import CalendarBody from "./CalendarParts/CalendarBody"
import CalendarHead from "./CalendarParts/CalendarHead"

const stylesContainer = `text-[16px] w-full
sm:text-[20px]
md:text-[24px]`
const stylesCalendarNodes = `inline-block text-center w-[calc(100%/7)]`

export default function Calendar(){
   return (
      <section className={stylesContainer}>
         <CalendarHead stylesCalendarNodes={stylesCalendarNodes}/>

         <CalendarBody stylesCalendarNodes={stylesCalendarNodes}/>
      </section>
   )
}