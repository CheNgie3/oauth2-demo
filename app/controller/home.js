'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.type = 'json';
    ctx.body = this.ctx.state;
  }
}

module.exports = HomeController;
