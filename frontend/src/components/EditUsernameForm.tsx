import { getAllUsernames } from "@/common/functions";
import { formStyles } from "@/common/globalConstants";
import usersServices from "@/services/usersServices";
import validationServices from "@/services/validationServices";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import RepeatUsernameInputErrorElement from "./InputErrorElements/RepeatUsernameInputErrorElement";
import UsernameInputErrorElement from "./InputErrorElements/UsernameInputErrorElement";
import LoadingScreen from "./LoadingScreen";

export default function EditUsernameForm(){
   const router = useRouter()
   
   const newUsernameInput = useRef<HTMLInputElement>(null)
   const repeatNewUsernameInput = useRef<HTMLInputElement>(null)

   const [allUsernames, setAllUsernames] = useState<string[]|null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const [newUsernameInputError, setNewUsernameInputError] = useState(<></>)
   const [repeatNewUsernameInputError, setRepeatNewUsernameInputError] = useState(<></>)

   function clearAllErrors(){
      setNewUsernameInputError(<></>)
      setRepeatNewUsernameInputError(<></>)
   }

   async function editUsername(){
      try{
         if(newUsernameInput.current){
            const newUsername = newUsernameInput.current.value

            await usersServices.editUsername(newUsername)
            .then(()=>{
               router.push('/account')
            })
         }
      }catch(err){
         alert("Couldn't edit username, try again.")

         setIsLoading(false)
      }
   }

   function validateAllInputs(){
      const newUsernameInputIsValid = validateNewUsernameInput()

      if(newUsernameInputIsValid){
         const repeatUsernameInputIsValid = validateRepeatNewUsernameInput()

         if(repeatUsernameInputIsValid){
            return true
         }
      }

      return false
   }

   function validateNewUsernameInput(){
      if(newUsernameInput.current && allUsernames){
         const newUsername = newUsernameInput.current.value

         const usernameInputCheck = validationServices.validateUsernameInput(allUsernames, newUsername)
         
         const usernameInputIsValid = usernameInputCheck.ok

         if(!usernameInputIsValid){
            setNewUsernameInputError(<UsernameInputErrorElement message={usernameInputCheck.message}/>)
         }

         return usernameInputIsValid
      }
   }

   function validateRepeatNewUsernameInput(){
      if(newUsernameInput.current && repeatNewUsernameInput.current){
         const newUsername = newUsernameInput.current.value
         
         const repeatNewUsername = repeatNewUsernameInput.current.value

         const repeatUsernameInputIsValid = validationServices.validateRepeatInput(newUsername, repeatNewUsername)

         if(!repeatUsernameInputIsValid){
            setRepeatNewUsernameInputError(<RepeatUsernameInputErrorElement/>)
         }

         return repeatUsernameInputIsValid
      }
   }

   function handleSubmit(e:FormEvent){
      e.preventDefault()

      clearAllErrors()

      const allInputsAreValid = validateAllInputs()

      if(allInputsAreValid){
         setIsLoading(true)
            
         editUsername()
      }
   }

   useEffect(()=>{
      getAllUsernames(setAllUsernames)
   }, [])

   return (
      <section className={formStyles.container}>
         <form className={formStyles.form} onSubmit={handleSubmit}>
            <fieldset className={formStyles.fieldset}>
               <input className={formStyles.input} id='newUsernameInput' ref={newUsernameInput} required type="text"/>

               <label className={formStyles.label} htmlFor='newUsernameInput'>New username:</label>

               {newUsernameInputError}
            </fieldset>
            
            <fieldset className={formStyles.fieldset}>
               <input className={formStyles.input} id='repeatNewUsernameInput' ref={repeatNewUsernameInput} required type="text"/>

               <label className={formStyles.label} htmlFor='repeatNewUsernameInput'>Repeat new username:</label>

               {repeatNewUsernameInputError}
            </fieldset>

            <button className={formStyles.button} type="submit">Edit</button>
         </form>

         {isLoading && 
            <LoadingScreen message='Editing your username...'/>
         }
      </section>
   )
}