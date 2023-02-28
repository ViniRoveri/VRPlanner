import User from '../schemas/userSchema.js'
import authServices from './authServices.js'

const USERS_SERVICES_AUTH_TOKEN = process.env.USERS_SERVICES_AUTH_TOKEN

const usersServices = {
   addUser(newUserData, authToken){
      if(authToken === USERS_SERVICES_AUTH_TOKEN){
         const newUser = new User(newUserData)

         newUser.save(err=>{
            if(err){
               throw new Error('Could not save user!')
            }
         })
      }else{
         throw new Error('Error on User Services: addUser')
      }
   },
   
   async editUserById(newUserData, selectedUserId, authToken){
      const EDIT_USER_INFO_AUTH_TOKEN = process.env.EDIT_USER_INFO_AUTH_TOKEN

      if(authToken === EDIT_USER_INFO_AUTH_TOKEN){
         await User.findByIdAndUpdate(
            selectedUserId,
            newUserData
         )
      }else{
         throw new Error('Error on User Services: editUserById')
      }
   },

   async getAllUsernames(authToken){
      if(authToken === USERS_SERVICES_AUTH_TOKEN){
         const allUsers = await User.find({})

         const allUsernames = allUsers.map(user=> user.username)

         return allUsernames
      }else{
         throw new Error('Error on User Services: getAllUsernames')
      }
   },

   async getUserById(selectedUserId, authToken){
      if(authToken === USERS_SERVICES_AUTH_TOKEN){
         const selectedUser = await User.findById(selectedUserId)
         
         if(selectedUser){
            return selectedUser
         }else{
            throw new Error('This user does not exist')
         }
      }else{
         throw new Error('Error on User Services: getUserById')
      }
   },

   async getUserByUsername(selectedUsername, authToken){
      if(authToken === USERS_SERVICES_AUTH_TOKEN){
         const selectedUser = await User.findOne({
            username: selectedUsername
         })

         return selectedUser
      }else{
         throw new Error('Error on User Services: getUserByUsername')
      }
   },

   async loginUser(username, authToken){
      const LOGIN_AUTH_TOKEN = process.env.LOGIN_AUTH_TOKEN
      
      if(authToken === LOGIN_AUTH_TOKEN){
         const accessToken = authServices.generateAccessToken(username)
         
         const selectedUser = await this.getUserByUsername(username, USERS_SERVICES_AUTH_TOKEN)
         const userId = selectedUser._id

         const loginInfo = {
            accessToken: accessToken,
            userId: userId
         }

         return loginInfo
      }else{
         throw new Error('Error on User Services: loginUser')
      }
   },

   validateToken(token, authToken){
      if(authToken === USERS_SERVICES_AUTH_TOKEN){
         return authServices.validateToken(token)
      }else{
         throw new Error('Error on User Services: validateToken')
      }
   }
}

export default usersServices