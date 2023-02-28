import { formStyles } from "@/common/globalConstants"

type Props = {
   message: string
}

export default function EventNameInputErrorElement(props:Props){
   return(
      <p className={formStyles.inputError}>*{props.message}</p>
   )
}