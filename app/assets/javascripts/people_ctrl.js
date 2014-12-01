(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){

    $http.get("/api/v1/people.json").then(function (response) {
      $scope.people = response.data;
    });

    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };
  });

}());
