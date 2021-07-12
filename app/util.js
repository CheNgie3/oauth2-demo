'use strict';

const { forEachObjIndexed, forEach } = require('ramda');
const chalk = require('chalk');

function initRouterMap(prefix, maps, router) {
  forEachObjIndexed((map, method) => {
    forEachObjIndexed((controller, url) => {
      info('[%s] -> %s', method, chalk.red(prefix + url));
      router[method](prefix + url, controller);
    }, map);
  }, maps);
}

/**
 * * 挂载 passport 验证到 Controller
 * @param {*} keys 验证规则
 * @param {*} passport passport 对象
 * @param {*} controller controller 对象
 */
function mountPassportToController(keys, passport, controller) {
  if (!controller.passport) {
    controller.passport = {};
  }
  forEach(value => {
    info('[passport] -> %s', chalk.red('controller.passport.' + value));
    controller.passport[value] = passport.authenticate(value, {
      session: false,
      successRedirect: undefined,
    });
  }, keys);
}

/**
 * * 挂载对应 passport 的验证 hook
 * @param {*} passport egg-passport插件挂载到 app 对象上的 passport 对象，
 * @param {*} { verify } 对应provider的验证规则逻辑
 */
function installPassport(passport, { verify }) {
  passport.verify(verify);
}

module.exports = {
  initRouterMap,
  mountPassportToController,
  installPassport,
};
