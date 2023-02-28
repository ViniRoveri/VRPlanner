import { formStyles } from "@/common/globalConstants";
import usersServices from "@/services/usersServices";
import validationServices from "@/services/validationServices";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import PasswordInputErrorElement from "./InputErrorElements/PasswordInputErrorElement";
import RepeatPasswordInputErrorElement from "./InputErrorElements/RepeatPasswordInputErrorElement";
import LoadingScreen from "./LoadingScreen";
import PasswordVisibilitySwitcher from "./PasswordVisibilitySwitcher";

export default function EditPasswordForm(){
   const router = useRouter()
   
   const newPasswordInput = useRef<HTMLInputElement>(null)
   const repeatNewPasswordInput = useRef<HTMLInputElement>(null)

   const [isLoading, setIsLoading] = useState(false)
   const [newPasswordInputError, setNewPasswordInputError] = useState(<></>)
   const [newPasswordInputType, setNewPasswordInputType] = useState<'password'|'text'>('password')
   const [repeatNewPasswordInputError, setRepeatNewPasswordInputError] = useState(<></>)
   const [repeatNewPasswordInputType, setRepeatNewPasswordInputType] = useState<'password'|'text'>('password')

   function clearAllErrors(){
      setNewPasswordInputError(<></>)
      setRepeatNewPasswordInputError(<></>)
   }

   async function editPassword(){
      try{
         if(newPasswordInput.current){
            const newPassword = newPasswordInput.current.value

            await usersServices.editPassword(newPassword)
            .then(()=>{
               router.push('/account')
            })
         }
      }catch(err){
         alert("Couldn't edit password, try again.")

         setIsLoading(false)
      }
   }

   function validateAllInputs(){
      const newPasswordInputIsValid = validateNewPasswordInput()

      if(newPasswordInputIsValid){
         const repeatPasswordInputIsValid = validateRepeatNewPasswordInput()

         if(repeatPasswordInputIsValid){
            return true
         }
      }

      return false
   }

   function validateNewPasswordInput(){
      if(newPasswordInput.current){
         const newPassword = newPasswordInput.current.value

         const passwordInputCheck = validationServices.validatePasswordInput(newPassword)
         
         const passwordInputIsValid = passwordInputCheck.ok

         if(!passwordInputIsValid){
            setNewPasswordInputError(<PasswordInputErrorElement message={passwordInputCheck.message}/>)
         }

         return passwordInputIsValid
      }
   }

   function validateRepeatNewPasswordInput(){
      if(newPasswordInput.current && repeatNewPasswordInput.current){
         const newPassword = newPasswordInput.current.value
         
         const repeatNewPassword = repeatNewPasswordInput.current.value

         const repeatPasswordInputIsValid = validationServices.validateRepeatInput(newPassword, repeatNewPassword)

         if(!repeatPasswordInputIsValid){
            setRepeatNewPasswordInputError(<RepeatPasswordInputErrorElement/>)
         }

         return repeatPasswordInputIsValid
      }
   }

   function handleSubmit(e:FormEvent){
      e.preventDefault()

      clearAllErrors()

      const allInputsAreValid = validateAllInputs()

      if(allInputsAreValid){
         setIsLoading(true)
            
         editPassword()
      }
   }

   return (
      <section className={formStyles.container}>
         <form className={formStyles.form} onSubmit={handleSubmit}>
            <fieldset className={formStyles.fieldset}>
               <input className={`${formStyles.input} ${formStyles.passwordInput}`} id='newPasswordInput' ref={newPasswordInput} required type={newPasswordInputType}/>

               <PasswordVisibilitySwitcher inputType={newPasswordInputType} setInputType={setNewPasswordInputType}/>

               <label className={formStyles.label} htmlFor='newPasswordInput'>New password:</label>

               {newPasswordInputError}
            </fieldset>
            
            <fieldset className={formStyles.fieldset}>
               <input className={`${formStyles.input} ${formStyles.passwordInput}`} id='repeatNewPasswordInput' ref={repeatNewPasswordInput} required type={repeatNewPasswordInputType}/>

               <PasswordVisibilitySwitcher inputType={repeatNewPasswordInputType} setInputType={setRepeatNewPasswordInputType}/>

               <label className={formStyles.label} htmlFor='repeatNewPasswordInput'>Repeat new password:</label>

               {repeatNewPasswordInputError}
            </fieldset>

            <button className={formStyles.button} type="submit">Edit</button>
         </form>

         {isLoading && 
            <LoadingScreen message='Editing your password...'/>
         }
      </section>
   )
}