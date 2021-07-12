'use strict';

const { globalBaseInitial, globalLogger } = require('./init.js');

globalBaseInitial(__dirname);

module.exports = app => {
  globalLogger(app);
};
