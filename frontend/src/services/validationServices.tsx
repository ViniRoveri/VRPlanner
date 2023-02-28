const validationServices = {
   validateEventNameInput(eventName:string){
      const nameIsLongerThan30 = eventName.length > 30

      if(nameIsLongerThan30){
         return {
            ok: false,
            message: "The event name length should be shorter than 30"
         }
      }

      return {
         ok: true,
         message: ""
      }
   },

   validatePasswordInput(password:string){   
      const passwordIsShorterThan3 = password.length < 3
   
      const passwordIsLongerThan40 = password.length > 40
   
      const space = new RegExp(/[\s]/)
      const passwordHaveSpaces = space.test(password)
   
      if(passwordIsShorterThan3){
         return {
            ok: false,
            message: "The password length should be longer than 3"
         }
      }
      if(passwordIsLongerThan40){
         return {
            ok: false,
            message: "The password length should be shorter than 40"
         }
      }
      if(passwordHaveSpaces){
         return {
            ok: false,
            message: "The password can't have spaces"
         }
      }

      return {
         ok: true,
         message: ""
      }
   },
   
   validateRepeatInput(value:string, repeatValue:string){
      if(value === repeatValue){
         return true
      }else{
         return false
      }
      
   },
   
   validateUsernameInput(allUsernames:string[], username:string){
      const usernameIsShorterThan3 = username.length < 3
   
      const usernameIsLongerThan20 = username.length > 20
   
      const capitalLetters = new RegExp(/[A-Z]/)
      const usernameHaveCapitalLetters = capitalLetters.test(username)
   
      const specialCharacters = new RegExp(/[^a-z0-9_\-]/)
      const usernameHaveSpecialCharacters = specialCharacters.test(username)
   
      const usernameAlreadyExists = allUsernames.includes(username)
   
      if(usernameIsShorterThan3){
         return {
            ok: false,
            message: "The username length should be longer than 3"
         }
      }
      if(usernameIsLongerThan20){
         return {
            ok: false,
            message: "The username length should be shorter than 20"
         }
      }
      if(usernameHaveCapitalLetters){
         return {
            ok: false,
            message: "The username can't have capital letters"
         }
      }
      if(usernameHaveSpecialCharacters){
         return {
            ok: false,
            message: "The username can't have spaces or special characters"
         }
      }
      if(usernameAlreadyExists){
         return {
            ok: false,
            message: "This username already exists"
         }
      }
      
      return {
         ok: true,
         message: ""
      }
   }
}

export default validationServices