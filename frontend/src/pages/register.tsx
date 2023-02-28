import DefaultHead from "@/components/DefaultHead"
import RegisterForm from "@/components/RegisterForm"

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`

export default function RegisterPage(){
   return (
      <>
      <DefaultHead title="Register | VR Planner"/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Register:</h2>

         <RegisterForm/>
      </main>
      </>
   )
}