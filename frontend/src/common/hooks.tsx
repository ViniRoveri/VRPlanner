import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkModeState, selectedDateState } from "./atoms";

export function useIsDarkMode(){
   const isDarkMode = useRecoilValue(isDarkModeState)

   return isDarkMode
}

export function useSelectedDate(){
   const selectedDate = useRecoilValue(selectedDateState)

   return selectedDate
}

export function useSetIsDarkMode(){
   const setIsDarkMode = useSetRecoilState(isDarkModeState)

   return (newDarkMode:boolean)=>{
      setIsDarkMode(newDarkMode)
   }
}

export function useSetSelectedDate(){
   const setSelectedDate = useSetRecoilState(selectedDateState)

   return (year:number, monthIndex:number, day:number)=>{
      const newSelectedDate = new Date(year, monthIndex, day)

      setSelectedDate(newSelectedDate)
   }
}