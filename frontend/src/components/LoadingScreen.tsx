type Props = {
   message: string
}

const stylesContainer = `bg-default-beige fixed flex flex-col h-screen items-center justify-center left-0 top-0 w-screen z-20
dark:bg-default-darkBrown`
const stylesCircle = `animate-spin border-t-4 h-16 rounded-full w-16
sm:h-17 sm:w-17
md:h-18 md:w-18`
const stylesMessage = `mt-4 text-[16px]
sm:text-[20px]
md:text-[24px]`

export default function LoadingScreen(props:Props){
   return (
      <section className={stylesContainer}>
         <div className={stylesCircle}/>

         <p className={stylesMessage}>{props.message}</p>
      </section>
   )
}