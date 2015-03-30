(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){

    $scope.setup = function() {
      $http.get("/api/v1/people.json").then(function (response) {
        $scope.people = response.data["people"];
      });
    };
    
    $scope.toggleVisible = function(person) {
      person.detailsVisible = !person.detailsVisible;
    };
  });

}());
