var frameModule = require('tns-core-modules/ui/frame');
var observableModule = require('tns-core-modules/data/observable');

var page;
var email;

var user = new observableModule.fromObject({
    email: 'user@domain.com',
    password: 'password'
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = user;
}

exports.signIn = function () {
    email = page.getViewById('email');
    console.log(email.text);
}

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/register/register');
}
