import Link from "next/link"
import { FormEvent, useEffect, useRef, useState } from "react"
import { formStyles } from "@/common/globalConstants"
import PasswordVisibilitySwitcher from "./PasswordVisibilitySwitcher"
import { useRouter } from "next/router"
import LoadingScreen from "./LoadingScreen"
import usersServices from "@/services/usersServices"
import UsernameInputErrorElement from "./InputErrorElements/UsernameInputErrorElement"
import PasswordInputErrorElement from "./InputErrorElements/PasswordInputErrorElement"
import RepeatPasswordInputErrorElement from "./InputErrorElements/RepeatPasswordInputErrorElement"
import validationServices from "@/services/validationServices"
import { getAllUsernames } from "@/common/functions"

export default function RegisterForm(){
   const router = useRouter()

   const usernameInput = useRef<HTMLInputElement>(null)
   const passwordInput = useRef<HTMLInputElement>(null)
   const repeatPasswordInput = useRef<HTMLInputElement>(null)

   const [allUsernames, setAllUsernames] = useState<string[]|null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const [loadingScreenMessage, setLoadingScreenMessage] = useState('')
   const [passwordInputError, setPasswordInputError] = useState(<></>)
   const [passwordInputType, setPasswordInputType] = useState<'password'|'text'>('password')
   const [repeatPasswordInputError, setRepeatPasswordInputError] = useState(<></>)
   const [repeatPasswordInputType, setRepeatPasswordInputType] = useState<'password'|'text'>('password')
   const [usernameInputError, setUsernameInputError] = useState(<></>)

   function clearAllErrors(){
      setPasswordInputError(<></>)
      setRepeatPasswordInputError(<></>)
      setUsernameInputError(<></>)
   }

   async function registerAndLoginUser(){
      setLoadingScreenMessage('Creating your account...')

      try{
         if(usernameInput.current && passwordInput.current){
            const username = usernameInput.current.value
            const password = passwordInput.current.value
            
            await usersServices.createUser(username, password)
            .then(async()=>{
               setLoadingScreenMessage('Logging you in...')
               
               await usersServices.loginUser(username)
            })
            .then(()=>{
               router.push('/')
            })
         }
      }catch(err){
         alert("Couldn't create user, try again.")

         setIsLoading(false)
      }
   }

   function validateAllInputs(){
      const usernameInputIsValid = validateUsernameInput()

      if(usernameInputIsValid){
         const passwordInputIsValid = validatePasswordInput()

         if(passwordInputIsValid){
            const repeatPasswordInputIsValid = validateRepeatPasswordInput()

            if(repeatPasswordInputIsValid){
               return true
            }
         }
      }

      return false
   }

   function validatePasswordInput(){
      if(passwordInput.current){
         const password = passwordInput.current.value

         const passwordInputCheck = validationServices.validatePasswordInput(password)

         const passwordInputIsValid = passwordInputCheck.ok
         
         if(!passwordInputIsValid){
            setPasswordInputError(<PasswordInputErrorElement message={passwordInputCheck.message}/>)
         }

         return passwordInputIsValid
      }
   }

   function validateRepeatPasswordInput(){
      if(passwordInput.current && repeatPasswordInput.current){
         const password = passwordInput.current.value
         const repeatPassword = repeatPasswordInput.current.value

         const repeatPasswordInputIsValid = validationServices.validateRepeatInput(password, repeatPassword)
               
         if(!repeatPasswordInputIsValid){
            setRepeatPasswordInputError(<RepeatPasswordInputErrorElement/>)
         }

         return repeatPasswordInputIsValid
      }
   }

   function validateUsernameInput(){
      if(usernameInput.current && allUsernames){
         const username = usernameInput.current.value

         const usernameInputCheck = validationServices.validateUsernameInput(allUsernames, username)

         const usernameInputIsValid = usernameInputCheck.ok

         if(!usernameInputIsValid){
            setUsernameInputError(<UsernameInputErrorElement message={usernameInputCheck.message}/>)
         }

         return usernameInputIsValid
      }
   }
   
   function handleSubmit(e:FormEvent){
      e.preventDefault()

      clearAllErrors()
      
      const allInputsAreValid = validateAllInputs()

      if(allInputsAreValid){
         setIsLoading(true)
               
         registerAndLoginUser()
      }
   }

   useEffect(()=>{
      getAllUsernames(setAllUsernames)
   }, [])
   
   return (
      <section className={formStyles.container}>
         <form className={formStyles.form} onSubmit={handleSubmit}>
            <fieldset className={formStyles.fieldset}>
               <input className={formStyles.input} id='usernameInput' ref={usernameInput} required type="text"/>

               <label className={formStyles.label} htmlFor='usernameInput'>Username:</label>
               
               {usernameInputError}
            </fieldset>
            
            <fieldset className={formStyles.fieldset}>
               <input className={`${formStyles.input} ${formStyles.passwordInput}`} id='passwordInput' ref={passwordInput} required type={passwordInputType}/>

               <PasswordVisibilitySwitcher inputType={passwordInputType} setInputType={setPasswordInputType}/>

               <label className={formStyles.label} htmlFor='passwordInput'>Password:</label>

               {passwordInputError}
            </fieldset>
            
            <fieldset className={formStyles.fieldset}>
               <input className={`${formStyles.input} ${formStyles.passwordInput}`} id='repeatPasswordInput' ref={repeatPasswordInput} required type={repeatPasswordInputType}/>

               <PasswordVisibilitySwitcher inputType={repeatPasswordInputType} setInputType={setRepeatPasswordInputType}/>

               <label className={formStyles.label} htmlFor='repeatPasswordInput'>Repeat Password:</label>

               {repeatPasswordInputError}
            </fieldset>

            <button className={formStyles.button} type="submit">Register</button>
         </form>

         <p className={formStyles.redirectP}>Already have an account? <Link href='/login' className={formStyles.redirectLink}>Login</Link></p>

         {isLoading && 
            <LoadingScreen message={loadingScreenMessage}/>
         }
      </section>
   )
}