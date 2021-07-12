'use strict';

const passportDebug = require('debug')('app:passport');

module.exports = {
  async verify(ctx, user) {
    passportDebug('use ' + user.provider);
    return require('./' + user.provider)(ctx, user);
  },

  /**
   * * 在存储到 Session 或者 Cookie 前序列号
   * @param {BaseContext} ctx 上下文
   * @param {object} user 用户
   * @return {object} user
   */
  async serializeUser(ctx, user) {
    return user;
  },

  /**
   * * 将序列号的数据还原
   * @param {BaseContext} ctx 上下文
   * @param {object} user 用户
   * @return {object} user
   */
  async deserializeUser(ctx, user) {
    return user;
  },
};
