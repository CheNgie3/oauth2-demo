'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  ok(ok) {
    if (ok) {
      return this.ctx.responseClient({ message: 'success' });
    }
    return this.ctx.responseClient({ message: 'failure' }, 500, '服务端出错');
  }
}

module.exports = BaseController;
