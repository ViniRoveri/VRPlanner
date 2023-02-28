import DefaultHead from "@/components/DefaultHead";
import LoginForm from "@/components/LoginForm";

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`

export default function LoginPage(){
   return (
      <>
      <DefaultHead title="Login | VR Planner"/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Login:</h2>

         <LoginForm/>
      </main>
      </>
   )
}