'use strict';

const bcrypt = require('bcrypt');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define(
    'User',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(40),
      avatar: STRING,
      password: STRING,
      email: {
        type: STRING,
        unique: true,
      },
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      tableName: 'Users',
    }
  );

  /**
   * * 哈希加密
   * @param {User} user 用户实例
   * @return {void}
   */
  async function hashPwd(user) {
    if (!user.changed('password')) {
      return;
    }
    user.password = await bcrypt.hash(user.password, 10);
  }

  User.beforeSave(hashPwd);

  /**
   * * 用户登录方法
   * @param {string} email 邮箱
   * @param {string} password 密码
   * @return {(User|boolean)} 登录成功的用户
   */
  User.Auth = async function(email, password) {
    const user = await this.findOne({ where: { email } });
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return false;
  };

  User.findByEmail = async function(email) {
    return await this.findOne({ where: { email } });
  };

  return User;
};
