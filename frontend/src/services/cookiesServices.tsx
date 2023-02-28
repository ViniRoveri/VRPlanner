import { Ctx } from '@/common/types'
import nookies from 'nookies'

const ONE_SECOND = 1
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_YEAR = ONE_DAY * 365

const cookiesServices = {
   deleteAll(ctx:Ctx|null = null){
      nookies.destroy(ctx, 'ACCESS_TOKEN')

      nookies.destroy(ctx, 'USER_ID')
   },

   getAccessToken(ctx:Ctx|null = null){
      const cookies = nookies.get(ctx)
      const accessToken = cookies.ACCESS_TOKEN

      return accessToken
   },

   getUserId(ctx:Ctx|null = null){
      const cookies = nookies.get(ctx)
      const userId = cookies.USER_ID

      return userId
   },
   
   save(accessToken:string, userId:string, ctx:Ctx|null = null){
      nookies.set(ctx, 'ACCESS_TOKEN', accessToken, {
         maxAge: ONE_YEAR,
         path: '/'
      })

      nookies.set(ctx, 'USER_ID', userId, {
         maxAge: ONE_YEAR,
         path: '/'
      })

   }
}

export default cookiesServices