/**
 * @file Ingress-ICE, configurations
 * @license MIT
 */

/*global fs */
/*global quit */
/*global args */
/* global config */

var config = {
    area: 'https://www.ingress.com/intel',
    login: 'SvetlanaCynthiade93@gmail.com',
    password: 'Ool8ooz2Ee9',
    cookiespath: 'cookie.txt',
    loginTimeout: 10000,
    timezone:false
};
var cookiespath = config.cookiespath;
var loginTimeout = config.loginTimeout;

/**
 * twostep auth trigger
 */
var twostep      = 0;
var webpage      = require('webpage');
var page         = webpage.create();
page.onConsoleMessage = function() {};
page.onError  = function() {};