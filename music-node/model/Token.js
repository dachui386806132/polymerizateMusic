const jwt = require ('jsonwebtoken');

Token = {
  en(str){ //加密 Token
    return  jwt.sign(str,'apache')
  },
  de(token){  //解密 Token
      try {
        let tokenKey = jwt.verify(token, 'apache')
        return{
          status:'success',
          tokenKey
        }

      } catch{
          return {
            status:'fail',
          }
      }
  }
}

module.exports = Token