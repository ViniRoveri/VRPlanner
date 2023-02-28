import { Dispatch, SetStateAction } from "react"
import { axiosApi } from "./axiosInstances"
import cookiesServices from "@/services/cookiesServices"
import { Ctx } from "./types"
import authServices from "@/services/authServices"

export async function authenticateUserServerSide(ctx:Ctx){
   const token = cookiesServices.getAccessToken(ctx)
   const userId = cookiesServices.getUserId(ctx)

   const tokenIsValid = await authServices.authenticateToken(token)

   const userIdIsValid = await authServices.authenticateUserId(userId, token)

   if(tokenIsValid && userIdIsValid){
      return {
         props: {}
      }
   }else{
      return {
         redirect: {
            destination: '/login',
            permanent: false
         }
      }
   }
}

export function getAllUsernames(setState:Dispatch<SetStateAction<string[]|null>>){
   const USERS_SERVICES_AUTH_TOKEN = process.env.NEXT_PUBLIC_USERS_SERVICES_AUTH_TOKEN

   const config = {
      headers: {
         'vr-authentication': USERS_SERVICES_AUTH_TOKEN
      }
   }

   axiosApi.get(
      'usernames',
      config
   )
   .then(res=> setState(res.data))
}

export async function getConnectedUser(userId:string, setState:Dispatch<SetStateAction<string>>){
   const token = cookiesServices.getAccessToken()

   const config = {
      headers: {
         'vr-authentication': process.env.NEXT_PUBLIC_USERS_SERVICES_AUTH_TOKEN,
         'token-authentication': token
      }
   }
   
   await axiosApi.get(
      `user/${userId}`,
      config
   )
   .then(res=>{
      const userInfo = res.data
      const username = userInfo.username

      if(username){
         setState(username)
      }
   })
}

export function getDatesRows(selectedYear:number, selectedMonthIndex:number){
   let datesArray:Date[] = []

   const datesRows:{[key:string]: (Date|string)[]} = {
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: []
   }
   
   function populateDatesArray(){
      for(let i = 1; new Date(selectedYear, selectedMonthIndex, i).getMonth() === selectedMonthIndex; i++){
         const currentDate = new Date(selectedYear, selectedMonthIndex, i)
   
         datesArray = [...datesArray, currentDate]
      }
   }

   function populateDatesRows(){
      for(let date of datesArray){
         if(date.getDate() === 1){
            for(let j=0; j < startWhiteSpaces; j++){
               datesRows.row1.push('')
            }
         }
   
         const rowsArray = Object.keys(datesRows)
   
         let dateIsAdded = false
         for(let row of rowsArray){
            if(!dateIsAdded && datesRows[row].length < 7){
               datesRows[row].push(date)

               dateIsAdded = true
            }
         }
      }
   }

   populateDatesArray()

   const startWhiteSpaces = datesArray[0].getDay()

   populateDatesRows()
   
   return datesRows
}

export function getFormattedFullDate(selectedDate:Date){
   const selectedDay = selectedDate.getDate()
   const selectedMonthIndex = selectedDate.getMonth()
   const selectedMonth = selectedMonthIndex + 1
   const selectedYear = selectedDate.getFullYear()
   
   const formattedDay = selectedDay.toString().padStart(2, '0')
   const formattedMonth = selectedMonth.toString().padStart(2, '0')

   const formattedDate = `${formattedDay}/${formattedMonth}/${selectedYear}`

   return formattedDate
}

export function getOptionHeight(){
   const windowWidth = window.innerWidth

   if(windowWidth < 426){
      return 39
   }

   if(windowWidth < 769){
      return 45
   }

   if(windowWidth >= 769){
      return 51
   }

   return 0
}