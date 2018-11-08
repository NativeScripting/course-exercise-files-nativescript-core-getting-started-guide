var dialogModule = require('tns-core-modules/ui/dialogs');
var observableModule = require('tns-core-modules/data/observable');
var ObservableArray = require('tns-core-modules/data/observable-array').ObservableArray;
var GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model');
var socialShare = require('nativescript-social-share');
var swipeDelete = require('../../shared/utils/ios-swipe-delete');

var page;


var groceryList = new GroceryListViewModel([]);
var pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: ''
});

exports.loaded = function (args) {
    page = args.object;

    if (page.ios) {
        var listView = page.getViewById('groceryList');
        swipeDelete.enable(listView, function (index) {
            groceryList.delete(index);
        });
    }

    var listView = page.getViewById('groceryList');
    page.bindingContext = pageData;
    groceryList.empty();
    pageData.set('isLoading', true);
    groceryList.load().then(function () {
        pageData.set('isLoading', false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

exports.add = function () {
    // Check for empty submission
    if (pageData.get('grocery').trim() === '') {
        dialogModule.alert({
            message: 'Enter a grocery item',
            okButtonText: 'OK'
        });
    }

    // Dismiss the keyboard
    page.getViewById('grocery').dismissSoftInput();

    groceryList.add(pageData.get('grocery'))
        .catch(function () {
            dialogModule.alert({
                message: 'An error occurred while adding an item to your list.',
                okButtonText: 'OK'
            });
        });

    // Empty the input field
    pageData.set('grocery', '');
};

exports.share = function () {
    var list = [];
    for (var i = 0, size = groceryList.length; i < size; i++) {
        list.push(groceryList.getItem(i).name);
    }
    var listString = list.join(', ').trim();
    socialShare.shareText(listString);
}

exports.delete = function (args) {
    var item = args.view.bindingContext;
    var index = groceryList.indexOf(item);
    groceryList.delete(index);
} 
