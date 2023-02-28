import { getFormattedFullDate, authenticateUserServerSide } from "@/common/functions";
import { useSelectedDate } from "@/common/hooks";
import { Ctx } from "@/common/types";
import AddEventForm from "@/components/EventsForms/AddEventForm";
import DefaultHead from "@/components/DefaultHead";
import GoBackArrow from "@/components/GoBackArrow";

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`
const stylesH3 = `text-[22px] text-center w-full
sm:text-[26px]
md:text-[30px]`

export default function EventAddPage(){
   const selectedDate = useSelectedDate()

   const formattedDate = getFormattedFullDate(selectedDate)

   return (
      <>
      <DefaultHead title="Add Event | VR Planner"/>

      <GoBackArrow/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Add event:</h2>

         <h3 className={stylesH3}>{`- Date of the event: ${formattedDate}`}</h3>

         <AddEventForm/>
      </main>
      </>
   )
}