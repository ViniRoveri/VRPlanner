import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
   checked?: boolean
   message: string
   state: boolean
   setState: Dispatch<SetStateAction<boolean>>
}

const stylesContainer = `border-b cursor-pointer flex items-center justify-start mt-1 w-full` 
const stylesCheckbox = `border flex h-5 inline-block items-center justify-center mr-4 text-[20px] w-5
sm:text-[24px]
md:text-[28px]`
const stylesP = `inline-block`

export default function FormCheckbox(props:Props){
   function handleClick(){
      props.setState(!props.state)
   }

   useEffect(()=>{
      if(props.checked){
         props.setState(true)
      }
   }, [])

   return (
      <fieldset className={stylesContainer} onClick={handleClick}>
         <span className={stylesCheckbox}>
            {props.state && 'X'}
         </span>

         <p className={stylesP}>{props.message}</p>
      </fieldset>
   )
}