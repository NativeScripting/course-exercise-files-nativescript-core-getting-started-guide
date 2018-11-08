var frameModule = require('tns-core-modules/ui/frame');

var page;
var email;

exports.loaded = function (args) {
    page = args.object;
}

exports.signIn = function () {
    email = page.getViewById('email');
    console.log(email.text);
}

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/register/register');
}
