var dialogModule = require('tns-core-modules/ui/dialogs');
var observableModule = require('tns-core-modules/data/observable');
var ObservableArray = require('tns-core-modules/data/observable-array').ObservableArray;
var GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model');

var page;


var groceryList = new GroceryListViewModel([]);
var pageData = new observableModule.fromObject({
    groceryList: groceryList
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
    groceryList.empty();
    groceryList.load();
};
