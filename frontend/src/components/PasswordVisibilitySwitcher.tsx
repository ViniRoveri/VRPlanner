import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { Dispatch, SetStateAction } from "react"

type Props = {
   inputType: string
   setInputType: Dispatch<SetStateAction<"password" | "text">>
}

const stylesContainer = `absolute cursor-pointer flex items-center justify-center right-3 top-2`
const stylesIcon = `h-5 w-5
sm:h-6 sm:w-6
md:h-7 md:w-7`

export default function PasswordVisibilitySwitcher(props:Props){
   function toggleInputType(){
      if(props.inputType === 'password'){
         props.setInputType('text')
      }else{
         props.setInputType('password')
      }
   }

   return (
      <button className={stylesContainer} onClick={()=>toggleInputType()} type='button'>
         {props.inputType === 'password' ? 
            <EyeIcon className={stylesIcon}/>
         :
            <EyeSlashIcon className={stylesIcon}/>
         }
      </button>
   )
}