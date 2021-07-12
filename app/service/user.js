'use strict';

const R = require('ramda');

class User extends S {
  constructor(ctx) {
    super(ctx);
    this._User = this.ctx.model.User;
    this.where = this.ctx.helper.where;
  }

  /**
   * * 注册逻辑
   * @return {Object} 返回注册成功的用户
   * @memberof User
   */
  async signUp() {
    const body = this.ctx.request.body;
    const user = await this._User.create(
      R.pick([ 'username', 'password', 'email' ], body)
    );
    return { user };
  }
}

module.exports = User;
