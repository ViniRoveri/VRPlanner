import { formStyles } from "@/common/globalConstants"

export default function RepeatUsernameInputErrorElement(){
   return(
      <p className={formStyles.inputError}>*The usernames don't match.</p>
   )
}