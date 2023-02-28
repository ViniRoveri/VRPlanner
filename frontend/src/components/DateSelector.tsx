import MonthSelector from "./DateSelectorParts/MonthSelector";
import MonthSwitchArrows from "./DateSelectorParts/MonthSwitchArrows";
import YearSelector from "./DateSelectorParts/YearSelector";

const stylesContainer = `flex items-center justify-between mb-1`

export default function DateSelector(){
   return (
      <section className={stylesContainer}>
         <YearSelector/>

         <MonthSelector/>

         <MonthSwitchArrows/>
      </section>
   )
}