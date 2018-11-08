var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
  var baseUrl = config.apiUrl + "appdata/" + config.appKey + "/Groceries";
  var viewModel = new ObservableArray(items);

  viewModel.load = function () {
    return fetchModule
      .fetch(baseUrl, {
        headers: getCommonHeaders()
      })
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach(grocery => {
          viewModel.push({
            id: grocery._id,
            name: grocery.Name
          });
        });
      });
  };

  viewModel.empty = function () {
    while (viewModel.length) {
      viewModel.pop();
    }
  };

  viewModel.add = function (name) {
    return fetchModule
      .fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify({ Name: name }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Kinvey " + config.token
        }
      })
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        viewModel.push({
          id: data._id,
          name: data.Name
        });
      });
  };

  viewModel.delete = function (index) {
    return fetchModule
      .fetch(baseUrl + "/" + viewModel.getItem(index).id, {
        method: "DELETE",
        body: JSON.stringify({ Name: name }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Kinvey " + config.token
        }
      })
      .then(handleErrors)
      .then(function () {
        viewModel.splice(index, 1);
      });
  };

  return viewModel;
}

function getCommonHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Kinvey " + config.token
  };
}

function handleErrors(response) {
  if (!response.ok) {
    console.log(JSON.stringify(response));
    throw Error(response.statusText);
  }
  return response;
}

module.exports = GroceryListViewModel;
