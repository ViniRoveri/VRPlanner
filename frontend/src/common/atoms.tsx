import { atom } from "recoil";

export const isDarkModeState = atom<boolean>({
   key: 'isDarkModeState',
   default: false
})

export const selectedDateState = atom<Date>({
   key: 'selectedDateState',
   default: new Date()
})

export const showHomeEventListState = atom<boolean>({
   key: 'showHomeEventListState',
   default: false
})
