/*global announce */
/*global config */
/*global page */
/*global system */
/*global prepare */
/*global hideDebris */
/*global setMinMax */
/*global addIitc */
/*global twostep */
/*global loginTimeout */
/*global quit */
/*global storeCookies */
/*global main */

/**
 * Fires plain login
 */
function firePlainLogin() {
  page.open('https://www.ingress.com/intel', function (status) {

    if (status !== 'success') {quitWithError('unable to connect to remote server')}

    var link = page.evaluate(function () {
      return document.getElementsByTagName('a')[0].href;
    });

    announce('Logging in...');
    page.open(link, function () {
      login(config.login, config.password);
    });
  });
}

/**
 * Log in to google. Doesn't use post, because URI may change.
 * Fixed in 3.0.0 -- obsolete versions will not work (google changed login form)
 * @param l - google login
 * @param p - google password
 */
function login(l, p) {
  page.evaluate(function (l) {
    document.getElementById('Email').value = l;
  }, l);
  page.evaluate(function () {
    document.querySelector("#next").click();
  });
  window.setTimeout(function () {
    page.evaluate(function (p) {
      document.getElementById('Passwd').value = p;
    }, p);
    page.evaluate(function () {
      document.querySelector("#next").click();
    });
    page.evaluate(function () {
      document.getElementById('gaia_loginform').submit();
    });
    window.setTimeout(function () {
      announce('Validating login credentials...');
      if (page.url.substring(0,40) === 'https://accounts.google.com/ServiceLogin') {
        quitWithError('login failed: wrong email and/or password');
      }

      if (page.url.substring(0,40) === 'https://appengine.google.com/_ah/loginfo') {
        announce('Accepting appEngine request...');
        page.evaluate(function () {
          document.getElementById('persist_checkbox').checked = true;
          document.getElementsByTagName('form').submit();
        });
      }

      // announce(page.url);
      // announce(page.url.substring(0,44));
      if (page.url.substring(0,44) === 'https://accounts.google.com/signin/challenge') {
        output('Using two-step verification, please enter your code:');
        twostep = 'wedontneedtwosetp';
      }

      announce("two-step code:" + twostep);
      if (twostep) {
          // announce("not has totpPin: " + !(document.getElementById('totpPin')));
        page.evaluate(function (code) {
          document.getElementById('totpPin').value = code;
        }, twostep);
        page.evaluate(function () {
          document.getElementById('submit').click();
          document.getElementById('challenge').submit();
        });
      }
      window.setTimeout(afterPlainLogin, loginTimeout);
    }, loginTimeout)
  }, loginTimeout / 10);
}

/**
 * Does all stuff needed after login/password authentication
 * @since 3.1.0
 */
function afterPlainLogin() {
  page.open(config.area, function() {
    if (!isSignedIn()) {
      quitWithError('Something went wrong. Please, sign in to Google via your browser and restart ICE. ');
    }
    window.setTimeout(function() {
      // storeCookies();
      var authResult = getAuthResult();
      quitWithResult(authResult);
    }, loginTimeout/10);
  });
}
