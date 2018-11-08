var frameModule = require('tns-core-modules/ui/frame');

exports.loaded = function () {
    console.log('hello');
}

exports.signIn = function () {
    alert('Signing in');
}

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/register/register');
}
