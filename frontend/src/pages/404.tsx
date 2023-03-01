import { useRouter } from "next/router"
import { useEffect } from "react"

const stylesContainer = `flex h-full items-center justify-center w-full`
const stylesText = `text-[50px]`

export default function Page404(){
   const router = useRouter()

   useEffect(()=>{
      router.push('/')
   }, [])

   return (
      <section className={stylesContainer}>
         <h2 className={stylesText}>Taking you home...</h2>
      </section>
   )
}