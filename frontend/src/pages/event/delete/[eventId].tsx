import { authenticateUserServerSide } from "@/common/functions"
import { loadingEvent } from "@/common/globalConstants"
import { Ctx } from "@/common/types"
import DefaultHead from "@/components/DefaultHead"
import DeleteEventForm from "@/components/EventsForms/DeleteEventForm"
import GoBackArrow from "@/components/GoBackArrow"
import EventCard from "@/components/UserEventsParts/EventCard"
import eventsServices from "@/services/eventsServices"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`
const stylesH3 = `mt-4 text-[25px] text-center w-full
sm:text-[29px]
md:text-[33px]`

export default function EventDeletePage(){
   const router = useRouter()
   const {eventId} = router.query
   const {md} = router.query
   const monthDisplay = typeof md === 'string' ? Number(md) : undefined

   const [selectedEvent, setSelectedEvent] = useState(loadingEvent)

   async function updateSelectedEvent(){
      if(typeof eventId === 'string'){
         const selectedEvent = await eventsServices.getEventById(eventId)

         setSelectedEvent(selectedEvent)
      }
   }

   useEffect(()=>{
      updateSelectedEvent()
   }, [])

   return (
      <>
      <DefaultHead title="Delete Event | VR Planner"/>

      <GoBackArrow/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Delete event:</h2>

         <EventCard event={selectedEvent} monthDisplay={monthDisplay} scope={'edit'}/>

         <h3 className={stylesH3}>Do you want to delete this event?</h3>

         <DeleteEventForm/>
      </main>
      </>
   )
}