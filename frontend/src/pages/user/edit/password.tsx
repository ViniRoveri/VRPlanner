import { authenticateUserServerSide } from "@/common/functions"
import { Ctx } from "@/common/types"
import DefaultHead from "@/components/DefaultHead"
import EditPasswordForm from "@/components/EditPasswordForm"
import GoBackArrow from "@/components/GoBackArrow"

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`

export default function EditPasswordPage(){
   return (
      <>
      <DefaultHead title="Edit Password | VR Planner"/>

      <GoBackArrow/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Edit password:</h2>

         <EditPasswordForm/>
      </main>
      </>
   )
}