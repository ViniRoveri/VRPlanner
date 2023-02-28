import { useSelectedDate, useSetSelectedDate } from "@/common/hooks"
import {ChevronRightIcon} from '@heroicons/react/24/solid'
import {ChevronLeftIcon} from '@heroicons/react/24/solid'

const stylesContainer = `flex items-center justify-center`
const stylesIcon = `cursor-pointer h-5 w-5
first:mr-4
sm:h-6 sm:w-6
sm:first:mr-5
md:h-7 md:w-7
md:first:mr-4
lg:first:mr-5`

export default function MonthSwitchArrows(){
   const selectedDate = useSelectedDate()
   const setSelectedDate = useSetSelectedDate()

   const selectedYear = selectedDate.getFullYear()
   const selectedMonthIndex = selectedDate.getMonth()

   function goToPreviousMonth(){
      let previousMonthIndex = selectedMonthIndex - 1
      if(selectedMonthIndex === 0){
         previousMonthIndex = 11
      }

      let updatedYear = selectedYear
      if(previousMonthIndex === 11){
         updatedYear -= 1
      }

      setSelectedDate(updatedYear, previousMonthIndex, 1)
   }
   
   function goToNextMonth(){
      let nextMonthIndex = selectedMonthIndex + 1
      if(selectedMonthIndex === 11){
         nextMonthIndex = 0
      }

      let updatedYear = selectedYear
      if(nextMonthIndex === 0){
         updatedYear += 1
      }

      setSelectedDate(updatedYear, nextMonthIndex, 1)
   }
   
   return (
      <div className={stylesContainer}>
         <ChevronLeftIcon className={stylesIcon} onClick={()=> goToPreviousMonth()}/>
         <ChevronRightIcon className={stylesIcon} onClick={()=> goToNextMonth()}/>
      </div>
   )
}