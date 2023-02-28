import Link from "next/link"
import { FormEvent, useRef, useState } from "react"
import { formStyles } from "@/common/globalConstants"
import PasswordVisibilitySwitcher from "./PasswordVisibilitySwitcher"
import { useRouter } from "next/router"
import LoadingScreen from "./LoadingScreen"
import usersServices from "@/services/usersServices"

export default function LoginForm(){
   const router = useRouter()
   
   const usernameInput = useRef<HTMLInputElement>(null)
   const passwordInput = useRef<HTMLInputElement>(null)

   const [isLoading, setIsLoading] = useState(false)
   const [loadingScreenMessage, setLoadingScreenMessage] = useState('')
   const [passwordInputError, setPasswordInputError] = useState(<></>)
   const [passwordInputType, setPasswordInputType] = useState<'password'|'text'>('password')
   const [usernameInputError, setUsernameInputError] = useState(<></>)

   function clearAllErrors(){
      setUsernameInputError(<></>)
      setPasswordInputError(<></>)
   }

   function PasswordInputErrorElement(){
      return(
         <p className={formStyles.inputError}>*Invalid password.</p>
      )
   }
   function UsernameInputErrorElement(){
      return(
         <p className={formStyles.inputError}>*Invalid username.</p>
      )
   }

   async function checkUserInfo(){
      setLoadingScreenMessage('Checking your info...')

      try{
         if(usernameInput.current && passwordInput.current){
            const username = usernameInput.current.value
            const password = passwordInput.current.value

            const userInfo = await usersServices.getUserByUsername(username)
            const userPassword = userInfo.password

            if(password === userPassword){
               setLoadingScreenMessage('Logging you in...')
               
               await usersServices.loginUser(username)
               .then(()=>{
                  router.push('/')
               })
            }else{
               setPasswordInputError(<PasswordInputErrorElement/>)

               setIsLoading(false)
            }
         }
      }catch(err){
         setUsernameInputError(<UsernameInputErrorElement/>)

         setIsLoading(false)
      }
   }

   function handleSubmit(e:FormEvent){
      e.preventDefault()

      clearAllErrors()

      setIsLoading(true)
      
      checkUserInfo()
   }

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

            <button className={formStyles.button} type="submit">Login</button>
         </form>

         <p className={formStyles.redirectP}>Don't have an account? <Link href='/register' className={formStyles.redirectLink}>Register</Link></p>

         {isLoading && 
            <LoadingScreen message={loadingScreenMessage}/>
         }
      </section>
   )
}