(function() {
    "use strict";

    angular.module("scrumboard.demo", ["ngRoute"])
        .controller("ScrumboardController", [ "$scope", "$http", "$location", ScrumboardController]);

    function ScrumboardController( $scope, $http, $location ) {
            $scope.data = [];
            $scope.error_message = "";

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


            $scope.logout = function () {
                $http.get("/auth_api/logout/")
                    .then(function() {
                        $location.url('/login');
                    });
            }
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
    }
}());