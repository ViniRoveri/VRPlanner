import { axiosApi } from "@/common/axiosInstances"

const authServices = {
   async authenticateToken(token:string){
      try{
         const config = {
            headers: {
               'vr-authentication': process.env.NEXT_PUBLIC_USERS_SERVICES_AUTH_TOKEN
            }
         }

         const data = {
            token: token
         }

         await axiosApi.post(
            'user/validate',
            data,
            config
         )
         .then(res=> res.data)

         return true
      }catch(err){
         return false
      }
   },

   async authenticateUserId(userId:string, token:string){
      try{
         const config = {
            headers: {
               'token-authentication': token,
               'vr-authentication': process.env.NEXT_PUBLIC_USERS_SERVICES_AUTH_TOKEN
            }
         }

         await axiosApi.get(
            `user/${userId}`,
            config
         )
         
         return true
      }catch(err){
         return false
      }
   }
}

export default authServices