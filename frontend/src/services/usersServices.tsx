import { axiosApi } from "@/common/axiosInstances"
import cookiesServices from "./cookiesServices"

const usersServices = {
   async createUser(username:string, password:string){
      const config = {
         headers: {
            'vr-authentication': process.env.NEXT_PUBLIC_USERS_SERVICES_AUTH_TOKEN
         }
      }

      const data = {
         username: username,
         password: password,
         events: []
      }
      
      await axiosApi.post(
         'user/add',
         data,
         config
      )
   },

   async editPassword(newPassword:string){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EDIT_USER_INFO_AUTH_TOKEN
         }
      }

      const data = {
         password: newPassword
      }

      await axiosApi.put(
         `user/edit/${userId}`,
         data,
         config
      )
   },

   async editUsername(newUsername:string){
      const token = cookiesServices.getAccessToken()
      const userId = cookiesServices.getUserId()

      const config = {
         headers: {
            'token-authentication': token,
            'vr-authentication': process.env.NEXT_PUBLIC_EDIT_USER_INFO_AUTH_TOKEN
         }
      }

      const data = {
         username: newUsername
      }

      await axiosApi.put(
         `user/edit/${userId}`,
         data,
         config
      )
   },

   async getUserByUsername(username:string){
      const config = {
         headers: {
            'vr-authentication': process.env.NEXT_PUBLIC_USERS_SERVICES_AUTH_TOKEN
         }
      }
      
      const userInfo = await axiosApi.get(
         `username/${username}`,
         config
      )
      .then(res=>{
         const userInfo = res.data

         if(userInfo){
            return userInfo
         }else{
            throw new Error('No user found.')
         }
      })

      return userInfo
   },

   async loginUser(username:string){
      const config = {
         headers: {
            'vr-authentication': process.env.NEXT_PUBLIC_LOGIN_AUTH_TOKEN
         }
      }

      await axiosApi.post(
         `user/login/${username}`,
         {},
         config
      )
      .then(res=>{
         const accessToken = res.data.accessToken
         const userId = res.data.userId
         
         cookiesServices.save(accessToken, userId)
      })
   }
}

export default usersServices