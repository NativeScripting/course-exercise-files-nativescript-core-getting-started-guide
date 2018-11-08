var dialogModule = require('tns-core-modules/ui/dialogs');
var observableModule = require('tns-core-modules/data/observable');
var ObservableArray = require('tns-core-modules/data/observable-array').ObservableArray;
var GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model');

var page;


var groceryList = new GroceryListViewModel([]);
var pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: ''
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
    groceryList.empty();
    pageData.set('isLoading', true);
    groceryList.load().then(function () {
        pageData.set('isLoading', false);
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
