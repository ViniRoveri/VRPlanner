import eventsServices from "@/services/eventsServices"
import { useRouter } from "next/router"

const stylesContainer = `w-full`
const defaultButtonStyles = `p-1 rounded-xl text-[20px] w-full
active:scale-[98%]
sm:text-[24px]
md:text-[28px]`
const stylesNoButton = `${defaultButtonStyles} bg-transparent border-2 mt-5`
const stylesYesButton = `${defaultButtonStyles} bg-default-blue mt-7 text-default-white
dark:bg-default-beige dark:text-default-black`

export default function DeleteEventForm(){
   const router = useRouter()

   const {eventId} = router.query
   const eventIdNumber = Number(eventId)

   function handleNoButton(){
      router.back()
   }

   function handleYesButton(){
      eventsServices.deleteEventById(eventIdNumber)

      router.push('/')
   }

   return (
      <section className={stylesContainer}>
         <button className={stylesYesButton} onClick={handleYesButton} type="button">Yes</button>
         
         <button className={stylesNoButton} onClick={handleNoButton} type="button">No</button>
      </section>
   )
}