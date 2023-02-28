import { authenticateUserServerSide } from "@/common/functions";
import { useShowHomeEventsList } from "@/common/hooks";
import { Ctx } from "@/common/types";
import Calendar from "@/components/Calendar";
import DateSelector from "@/components/DateSelector";
import DefaultHead from "@/components/DefaultHead";
import DividingLine from "@/components/DividingLine";
import HomePageEventList from "@/components/HomePageEventList";
import UserEventsPart from "@/components/UserEventsPart";

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex justify-center`

export default function HomePage(){
   const showHomeEventList = useShowHomeEventsList()

   return (
      <>
      <DefaultHead title="Home | VR Planner"/>

      <section className={stylesContainer}>
         <main className="main-home">
            <DateSelector/>

            <Calendar/>

            <DividingLine/>

            <UserEventsPart/>
         </main>

         {showHomeEventList && 
            <HomePageEventList/>
         }
      </section>
      </>
   )
}