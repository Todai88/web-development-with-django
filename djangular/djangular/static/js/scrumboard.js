(function() {
    "use strict";

    angular.module("scrumboard.demo", ["ngRoute"])
        .controller("ScrumboardController", [ "$scope", "$http", "$location", "Login", ScrumboardController]);

    function ScrumboardController( $scope, $http, $location, Login ) {
            $scope.data = [];
            $scope.error_message = "";
            Login.redirectifNotLoggedIn();
            $scope.logout = Login.logout;
            $scope.sortBy = "story_points";
            $scope.reverse = true;
            $scope.showFilters = false;

            $scope.add = function (list, title) {
                let card = {
                    title: title
                };
                $http.post("/scrumboard/cards/", card)
                    .then(function(response) {
                        list.cards.push(response.data);
                    },
                    function(error) {
                         $scope.error_message = "Failed to load data:\n" + error.statusText;
                    })
                    .finally(function() {
                        title = "";
                    });
            };

            $http.get("/scrumboard/lists/")
                .then(function(response){
                    // SUCCESS
                    $scope.data = response.data;
                }, function(error) {
                    // ERROR
                    $scope.error_message = "Failed to load data:\n" + error.statusText;
                })
                .finally(function() {
                    // Do somethings to show that we finished.
                });
        };
}());