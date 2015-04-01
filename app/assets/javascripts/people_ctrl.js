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
        }, function (error) {

        });


      $scope.newPersonName = "";
      $scope.newPersonDetails = "";
    };

    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };

    window.scope = $scope;
  });

}());
