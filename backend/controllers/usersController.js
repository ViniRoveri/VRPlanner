import usersServices from "../services/usersServices.js"
import authServices from "../services/authServices.js"

const usersController = {
   addUser(req,res){
      try{
         const newUserData = req.body
         const authToken = authServices.getAuthTokenFromHeader(req)
      
         usersServices.addUser(newUserData, authToken)

         res.status(201).send('User added sucessfully!')
      }catch(err){
         console.log(err)
         res.status(500).send('Could not add new user.')
      }
   },
   
   async editUserById(req,res){
      try{
         const newUserData = req.body
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
      
         await usersServices.editUserById(newUserData, selectedUserId, authToken)

         res.send('User edited sucessfully!')
      }catch(err){
         console.log(err)
         res.status(500).send('Could not edit user.')
      }
   },

   async getAllUsernames(req,res){
      try{
         const authToken = authServices.getAuthTokenFromHeader(req)

         const allUsernames = await usersServices.getAllUsernames(authToken)

         res.send(allUsernames)
      }catch(err){
         console.log(err)
         res.status(500).send('Could not get all usernames.')
      }
   },

   async getUserById(req,res){
      try{
         const selectedUserId = req.params.userId

         const authToken = authServices.getAuthTokenFromHeader(req)
         const tokenFromHeader = authServices.getAccessTokenFromHeader(req)

         authServices.validateToken(tokenFromHeader)
         
         const selectedUser = await usersServices.getUserById(selectedUserId, authToken)

         res.send(selectedUser)
      }catch(err){
         console.log(err)
         res.status(500).send('Could not get user.')
      }
   },
   
   async getUserByUsername(req,res){
      try{
         const selectedUsername = req.params.username

         const authToken = authServices.getAuthTokenFromHeader(req)
         
         const selectedUser = await usersServices.getUserByUsername(selectedUsername, authToken)

         res.send(selectedUser)
      }catch(err){
         console.log(err)
         res.status(500).send('Could not get user.')
      }
   },

   async loginUser(req,res){
      try{
         const username = req.params.username

         const authToken = authServices.getAuthTokenFromHeader(req)

         const loginInfo = await usersServices.loginUser(username, authToken)

         res.send(loginInfo)
      }catch(err){
         console.log(err)
         res.status(500).send('Could not login user.')
      }
   },

   validateToken(req,res){
      try{
         const token = req.body.token

         const authToken = authServices.getAuthTokenFromHeader(req)
      
         usersServices.validateToken(token, authToken)

         res.send(true)
      }catch(err){
         console.log(err)
         res.status(500).send('Invalid token.')
      }
   }
}

export default usersController
