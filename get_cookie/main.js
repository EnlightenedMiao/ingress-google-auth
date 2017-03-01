
/**
 * @file get-cookie main script
 * @author MagicBoy110
 * @version 0.1.0
 */

"use strict";

/*global phantom */
/*global require */
/*global ice */

var system    = require('system');
var args      = system.args;
var fs        = require('fs');
var iceFolder = 'get_cookie/modules/';
var iceModules= fs.list(iceFolder);

/*
 * Loads all scripts in the 'modules' folder
 */
function loadModules() {
    for(var i = 0; i < iceModules.length; i++) {
        var file = iceFolder + iceModules[i];
        if(fs.isFile(file)){
            phantom.injectJs(file);
        }
    }
}

loadModules();
window.setTimeout(firePlainLogin, 1000);
