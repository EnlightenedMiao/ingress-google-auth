/*global version */
/*global phantom */

/**
 * console.log() wrapper, work only in debug mode
 * @param {String} str - what to announce
 */
function announce(str) {
  // console.log(getDateTime(0, config.timezone) + ': ' + str);
    if(config.debugEnable){
        console.log(str);
    }
}
//output to cosole
function output(str) {
    console.log(str);
}

/**
 * Returns Date and time
 * @param {number} format - the format of output, 0 for DD.MM.YYY HH:MM:SS T, 1 for YYYY-MM-DD--HH-MM-SS (for filenames)
 * @param {boolean} timezone
 * @returns {String} date
 */
function getDateTime(format, timezone) {
  var now     = new Date();
  var year    = now.getFullYear();
  var month   = now.getMonth()+1;
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds();
  var timeZone = '';
  if (timezone) {
    timeZone = ' ' + now.toTimeString().substr(9);
  }
  if(month.toString().length === 1) {
    month = '0' + month;
  }
  if(day.toString().length === 1) {
    day = '0' + day;
  }
  if(hour.toString().length === 1) {
    hour = '0' + hour;
  }
  if(minute.toString().length === 1) {
    minute = '0' + minute;
  }
  if(second.toString().length === 1) {
    second = '0' + second;
  }
  var dateTime;
  if (format === 1) {
    dateTime = year + '-' + month + '-' + day + '--' + hour + '-' + minute + '-' + second;
  } else {
    dateTime = day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second + timeZone;
  }
  return dateTime;
}

/**
 * Quit if an error occured
 * @param {String} err - the error text
 */
function quitWithError(errorMsg) {
  var result = {
      status: 'error',
      errorMsg: errorMsg,
  };
  quitWithResult(result);
}

function quitWithResult(result) {
  output(JSON.stringify(result));
  phantom.exit();
}

function quit(msg) {
    if(msg){
      announce(msg);
      quit(msg)
    }
    else {
      quit();
    }
}


/**
 * Greeter. Beautiful ASCII-Art logo.
 */
function greet() {
  output('\n     _____ )   ___      _____) \n    (, /  (__/_____)  /        \n      /     /         )__      \n  ___/__   /        /          \n(__ /     (______) (_____)  v' + version + '\n\nIf you need help or want a new feature, visit https://github.com/nibogd/ingress-ice/issues');
}

