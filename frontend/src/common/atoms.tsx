import { atom } from "recoil";

export const isDarkModeState = atom<boolean>({
   key: 'isDarkModeState',
   default: false
})

function getSelectedDateDefault(){
   const today = new Date()

   const year = today.getFullYear()
   const month = today.getMonth()
   const day = today.getDate()

   const selectedDateDefault = new Date(year, month, day)

   return selectedDateDefault
}
export const selectedDateState = atom<Date>({
   key: 'selectedDateState',
   default: getSelectedDateDefault()
})

export const showHomeEventListState = atom<boolean>({
   key: 'showHomeEventListState',
   default: false
})
