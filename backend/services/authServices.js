import jwt from 'jsonwebtoken'

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET
const ACCESSTOKEN_EXPIRATION = '1y'

const authServices = {
   decodeToken(token) {
      return jwt.decode(token)
   },

   generateAccessToken(userId, username){
      return jwt.sign(
         {
            username: username
         },
         ACCESSTOKEN_SECRET,
         {
            subject: userId,
            expiresIn: ACCESSTOKEN_EXPIRATION 
         }
      )
   },

   getAccessTokenFromHeader(req) {
      const token = req.headers['token-authentication']

      return token
   },

   getAuthTokenFromHeader(req) {
      const authToken = req.headers['vr-authentication']
   
      return authToken
   },
   
   validateToken(accessToken){
      return jwt.verify(accessToken, ACCESSTOKEN_SECRET)
   }
}

export default authServices
