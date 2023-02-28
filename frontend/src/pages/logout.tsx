import { authenticateUserServerSide } from "@/common/functions"
import { Ctx } from "@/common/types"
import DefaultHead from "@/components/DefaultHead"
import GoBackArrow from "@/components/GoBackArrow"
import LogoutForm from "@/components/LogoutForm"

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`
const stylesH3 = `text-[24px] text-center w-full
sm:text-[28px]
md:text-[32px]`

export default function UserLogoutPage(){
   return (
      <>
      <DefaultHead title="Logout | VR Planner"/>

      <GoBackArrow/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Logout:</h2>

         <h3 className={stylesH3}>Do you want to logout?</h3>

         <LogoutForm/>
      </main>
      </>
   )
}