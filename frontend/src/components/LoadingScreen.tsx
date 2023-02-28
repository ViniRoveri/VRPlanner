type Props = {
   message: string
}

const stylesContainer = `bg-default-beige fixed flex flex-col h-screen items-center justify-center left-0 top-0 w-screen z-20
dark:bg-default-darkBrown`
const stylesCircle = `animate-spin border-t-4 h-16 rounded-full w-16`
const stylesMessage = `mt-4`

export default function LoadingScreen(props:Props){
   return (
      <section className={stylesContainer}>
         <div className={stylesCircle}/>

         <p className={stylesMessage}>{props.message}</p>
      </section>
   )
}