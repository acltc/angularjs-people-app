(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){

    $http.get("/api/v1/people.json").then(function (response) {
      $scope.people = response.data;
    });

    $scope.addPerson = function(name, details) {
      var newPerson = { name: name, details: details };
      $http.post('/api/v1/people.json', {person: newPerson}).then(function(response) {
      }, function (error) {
        $scope.error = error.statusText;
      });
      $scope.people.push(newPerson);
    }

    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };


  });

}());
