(function() {
    "use strict";

    angular.module("scrumboard.demo", [])
        .controller("ScrumboardController", [ "$scope", "$http", ScrumboardController]);

    function ScrumboardController( $scope, $http ) {
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