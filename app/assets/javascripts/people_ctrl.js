(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){


    $scope.fetchData = function() {
      $http.get("/api/v1/people.json").then(function(response) {
        $scope.people = response.data["people"];
      });
    };

    $scope.addPerson = function(newName, newDetails) {
      var person = {
        name: newName,
        details: newDetails
      };

      $http.post('/api/v1/people.json', person).then(function(response) {
          $scope.people.push(person);
          $scope.newPersonName = "";
          $scope.newPersonDetails = "";
          $scope.errors = null;
        }, function (error) {
          $scope.errors = error.data.errors;
        });


      
    };

    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };

    $scope.descending = true;

    $scope.changeOrder = function(attribute) {
      $scope.orderByAttribute = attribute;
      $scope.descending = !$scope.descending;
    };

    window.scope = $scope;
  });

}());
