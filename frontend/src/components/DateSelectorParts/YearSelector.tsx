import { getOptionHeight } from "@/common/functions"
import { years } from "@/common/globalConstants"
import { useSelectedDate, useSetSelectedDate } from "@/common/hooks"
import {ChevronUpIcon} from '@heroicons/react/24/solid'
import {ChevronDownIcon} from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from "react"

const stylesContainer = `inline-block relative`
const stylesSelected = `cursor-pointer flex items-center justify-start`
const stylesTitle = `mr-1.5 text-[25px]
sm:text-[29px]
md:text-[33px]`
const stylesIcon = `h-5 w-5
sm:h-6 sm:w-6
md:h-7 md:w-7`
const stylesOptions = `absolute border-y max-h-[calc(39px*5.5)] overflow-y-auto text-center w-full z-10
sm:max-h-[calc(45px*5.5)]`
const stylesOption = `border bg-default-beige cursor-pointer py-0.5 text-[22px] w-full 
dark:bg-default-darkBrown
last:rounded-b-lg
sm:text-[26px]
md:text-[30px]`
const stylesActiveYear = `!bg-default-blue font-bold text-default-beige 
dark:!bg-default-beige dark:text-default-darkBrown`

export default function YearSelector(){
   const selectedDate = useSelectedDate()
   const setSelectedDate = useSetSelectedDate()

   const options = useRef<HTMLUListElement>(null)

   const [optionsAreOpen, setOptionsAreOpen] = useState(false)

   const selectedYear = selectedDate.getFullYear()
   const selectedMonthIndex = selectedDate.getMonth()

   function handleYearClick(newYear:number){
      setSelectedDate(newYear, selectedMonthIndex, 1)

      setOptionsAreOpen(false)
   }

   useEffect(()=>{
      if(optionsAreOpen && options.current){
         const selectedYearIndex = years.findIndex(year=> year === selectedYear)

         const optionHeight = getOptionHeight()

         options.current.scroll(0, (optionHeight - 2) * selectedYearIndex)
      }
   }, [optionsAreOpen])
   
   return (
      <div className={stylesContainer} tabIndex={0} onBlur={()=>setOptionsAreOpen(false)}>
         <div className={stylesSelected} onClick={()=> setOptionsAreOpen(!optionsAreOpen)}>
            <h3 className={stylesTitle}>{selectedYear}</h3>
            <div className={stylesIcon}>
               {optionsAreOpen ?
                  <ChevronUpIcon/>
                  :
                  <ChevronDownIcon/>
               }
            </div>
         </div>


         <ul className={`${stylesOptions} ${!optionsAreOpen ? 'hidden' : ''}`} ref={options}>
            {years.map(year=>(
               <li key={year} className={`${stylesOption} ${year === selectedYear ? stylesActiveYear : ''}`} onClick={()=> handleYearClick(year)}>
                  {year}
               </li>
               ))}
         </ul>
      </div>
   )
}