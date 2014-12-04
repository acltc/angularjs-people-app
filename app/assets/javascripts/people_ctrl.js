(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){

    $http.get("/api/v1/people.json").then(function (response) {
      $scope.people = response.data;
    });

    $scope.addPerson = function(name, details) {
      var newPerson = { name: name, details: details };
      $http.post('/api/v1/people.json', {person: newPerson}).then(function(response) {
        $scope.people.push(newPerson);
      }, function (error) {
        $scope.errors = error.data.errors;
      });
    }

    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };

    window.scope = $scope;

  });

}());
