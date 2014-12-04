(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){
    
    $scope.changeOrder = function(attribute) {
      $scope.orderAttribute = attribute;
      $scope.sortDirection = !$scope.sortDirection;
    };

    $http.get("/api/v1/people.json").then(function (response) {
      $scope.people = response.data;
    });

    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };

    $scope.addPerson = function(name, details) {
      var newPerson = { name: name, details: details, detailsVisible: false};
      $http.post('/api/v1/people.json', {person: newPerson}).then(function(response) {

        }, function (error) {
          $scope.error = error.statusText;
        });
      
      $scope.people.push(newPerson);
      $scope.newPersonName = "";
      $scope.newPersonDetails = "";
    };

    $scope.numberOfPeople = function() {
      return $scope.people.length;
    };

    $scope.deletePerson = function(personIndex) {
      $scope.people.splice(personIndex, 1);
    };

    window.scope = $scope;
  });

}());
