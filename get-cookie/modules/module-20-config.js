/*global fs */
/*global quit */
/*global args */
/* global config */

if(!args[1] || !args[2]){
    quitWithError("command args error: login email and password is necessary");
}

var config = {
    debugEnable: false,
    area: 'https://www.ingress.com/intel',
    login: args[1],
    password: args[2],
    securityEmail: '',
    cookiespath: 'cookie.txt',
    loginTimeout: 10000,
    timezone:false
};
var cookiespath = config.cookiespath;
var loginTimeout = config.loginTimeout;

announce("config:" + JSON.stringify(config));


/**
 * twostep auth trigger
 */
var twostep      = 0;
var webpage      = require('webpage');
var page         = webpage.create();
page.onConsoleMessage = function() {};
page.onError  = function() {};