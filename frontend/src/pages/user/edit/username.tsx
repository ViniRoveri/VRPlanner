import { authenticateUserServerSide } from "@/common/functions"
import { Ctx } from "@/common/types"
import DefaultHead from "@/components/DefaultHead"
import EditUsernameForm from "@/components/EditUsernameForm"
import GoBackArrow from "@/components/GoBackArrow"

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`

export default function EditUsernamePage(){
   return (
      <>
      <DefaultHead title="Edit Username | VR Planner"/>

      <GoBackArrow/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Edit username:</h2>

         <EditUsernameForm/>
      </main>
      </>
   )
}