import { formStyles } from "@/common/globalConstants"

export default function RepeatPasswordInputErrorElement(){
   return(
      <p className={formStyles.inputError}>*The passwords don't match.</p>
   )
}