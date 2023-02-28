import { authenticateUserServerSide } from "@/common/functions"
import { Ctx } from "@/common/types"
import YearSelector from "@/components/DateSelectorParts/YearSelector"
import DefaultHead from "@/components/DefaultHead"
import GoBackArrow from "@/components/GoBackArrow"
import UserEventsList from "@/components/UserEventsList"

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`
const stylesContainerSelectedYear = `border flex items-center justify-center rounded text-center w-full`
const stylesH3 = `inline-block mr-4 text-[22px] text-center
sm:text-[26px]
md:text-[30px]`

export default function EventListPage(){
   return (
      <>
      <DefaultHead title="Events List | VR Planner"/>

      <GoBackArrow/>

      <main>
         <h2 className={stylesTitle}>My events list:</h2>

         <div className={stylesContainerSelectedYear}>
            <h3 className={stylesH3}>Showing events from:</h3>

            <YearSelector/>
         </div>

         <UserEventsList/>
      </main>
      </>
   )
}