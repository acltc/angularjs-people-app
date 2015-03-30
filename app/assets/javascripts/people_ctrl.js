(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope){

    $scope.setup = function() {
      $http.get("/api/v1/people.json").then(function (response) {
        $scope.people = response.data;
      });
    };

    

    $scope.toggleDetailsVisible = function(person) {

      person.detailsVisible = !person.detailsVisible;

    };

    $scope.addNewPerson = function(name, details) {
      var person = {
        name: name,
        details: details,
        detailsVisible: false
      };
      $scope.people.push(person);
    }

    $scope.totalCount = function() {
      return $scope.people.length;
    };

    $scope.deletePerson = function(person) {
      $scope.people.splice($scope.people.indexOf(person), 1);
    };
    
  });

}());
