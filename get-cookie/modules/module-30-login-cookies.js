
/*global announce */
/*global config */
/*global page */
/*global prepare */
/*global hideDebris */
/*global setMinMax */
/*global addIitc */
/*global loginTimeout */
/*global quit */
/*global firePlainLogin */
/*global phantom */
/*global main */
/*global fs */
/*global cookiespath */

/**
 * Checks if cookies file exists. If so, it sets SACSID and CSRF vars
 * @returns {boolean}
 * @author mfcanovas (github.com/mfcanovas)
 * @since 3.2.0
 */
// function loadCookies() {
//   if(fs.exists(cookiespath)) {
//     var stream = fs.open(cookiespath, 'r');
//
//     while(!stream.atEnd()) {
//       var line = stream.readLine().split('=');
//       if(line[0] === 'SACSID') {
//         config.SACSID = line[1];
//       } else if(line[0] === 'csrftoken') {
//         config.CSRF = line[1];
//       }
//     }
//     stream.close();
//   }
// }

/**
 * Log in using cookies
 * @param {String} sacsid
 * @param {String} csrf
 * @since 3.1.0
 */
function addCookies(sacsid, csrf) {
  phantom.addCookie({
    name: 'SACSID',
    value: sacsid,
    domain: 'www.ingress.com',
    path: '/',
    httponly: true,
    secure: true
  });
  phantom.addCookie({
    name: 'csrftoken',
    value: csrf,
    domain: 'www.ingress.com',
    path: '/'
  });
}

/**
 * Checks if user is signed in by looking for the "Sign in" button
 * @returns {boolean}
 * @since 3.2.0
 */
function isSignedIn() {
  return page.evaluate(function() {
    return document.getElementsByTagName('a')[0].innerText.trim() !== 'Sign in';
  });
}

function storeCookies() {
  var cookies = page.cookies;
  fs.write(cookiespath, '', 'w');
  for(var i in cookies) {
    fs.write(cookiespath, cookies[i].name + '=' + cookies[i].value +'\n', 'a');
  }
}

function getAuthResult() {
    var cookies = page.cookies;
    announce("cookies:" + cookies);
    var result = {
      status: 'success',
      data:{
          SACSID:"",
          csrftoken: "",
          payload_v: "",
      }
    };
    for(var i in cookies) {
        if(cookies[i].name=='SACSID'){
            announce("SACSID:" + cookies[i].value);
            result.data.SACSID = cookies[i].value;
        }
        if(cookies[i].name=='csrftoken'){
            announce("csrftoken:" + cookies[i].value);
            result.data.csrftoken = cookies[i].value;
        }
    }
    var html = page.content;
    var payloadRe = /gen_dashboard_(\w*)/g ;
    var payloadArray = payloadRe.exec(html);
    announce("payload_v:" + payloadArray[1]);
    result.data.payload_v = payloadArray[1];
    return result;
}


function removeCookies() {
  if(fs.exists(cookiespath)){
      fs.remove(cookiespath);
  }
}
