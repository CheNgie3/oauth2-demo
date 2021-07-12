'use strict';

module.exports = {
  /**
   * * jwt 加密用户数据，返回token
   * @param {object} user 用户数据
   * @param {boolean} remember_me 是否记住我？7天：1天
   * @return {string} token
   */
  async sign_token(user, remember_me) {
    return new Promise((resolve, reject) => {
      this.app.jwt.sign(user, this.app.config.jwt.secret, { expiresIn: remember_me ? '7d' : '1d' }, (err, token) => {
        err && reject(err);
        resolve(token);
      });
    });
  },


  /**
   * * jwt 解密用户数据
   * @param {string} token token
   * @return {object} 用户数据
   */
  // async verify(token) {
  //   return new Promise(resolve => {
  //     const decode = this.app.jwt.verify(token.split(' ')[1], this.app.config.jwt.secret);
  //     resolve(decode);
  //   });
  // },

  responseClient(data = {}, httpCode = 200, message = 'OK') {
    const responseData = {
      errorCode: httpCode,
      errorDescription: message,
      response: data,
    };
    this.body = responseData;
  },

  random(len) {
    return Math.random().toString(36).slice(3, len + 3);
  },
};
