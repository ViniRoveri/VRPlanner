import YearSelector from "./DateSelectorParts/YearSelector"
import UserEventsList from "./UserEventsList"

const stylesContainer = `border-l inline-block max-w-[640px] px-8 py-2 w-1/2`
const stylesTitle = `font-title text-[43px] text-right w-full`
const stylesContainerSelectedYear = `border flex items-center justify-center rounded text-center w-full`
const stylesH3 = `inline-block mr-4 text-[26px] text-center`

export default function HomePageEventList(){
   return (
      <section className={stylesContainer}>
         <h2 className={stylesTitle}>My events list:</h2>

         <div className={stylesContainerSelectedYear}>
            <h3 className={stylesH3}>Showing events from:</h3>

            <YearSelector/>
         </div>

         <UserEventsList/>
      </section>
   )
}