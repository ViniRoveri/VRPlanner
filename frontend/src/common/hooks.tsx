import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkModeState, selectedDateState, showHomeEventListState } from "./atoms";

export function useIsDarkMode(){
   const isDarkMode = useRecoilValue(isDarkModeState)

   return isDarkMode
}

export function useSelectedDate(){
   const selectedDate = useRecoilValue(selectedDateState)

   return selectedDate
}

export function useShowHomeEventsList(){
   const showHomeEventList = useRecoilValue(showHomeEventListState)

   return showHomeEventList
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

export function useSetShowHomeEventsList(){
   const setShowHomeEventsList = useSetRecoilState(showHomeEventListState)

   return (newBoolean:boolean)=>{
      setShowHomeEventsList(newBoolean)
   }
}