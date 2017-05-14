(function () {
    "use strict";

    angular.module('scrumboard.demo')
        .directive('scrumboardCard', CardDirective);

    function CardDirective() {
        return {
            templateUrl: "/static/html/card.html",
            restrict: 'E',
            controller: ['$scope', '$http', function ($scope, $http) {
                let url = '/scrumboard/cards/' + $scope.card.id + '/';
                $scope.update = function() {
                    $http.put(url, $scope.card)
                        .finally(function() {
                            $scope.edit = false;
                        });
                };
                $scope.delete = function() {
                    $http.delete(url)
                        .then(function(response){
                            //success
                            let cards = $scope.list.cards;
                            cards.splice(
                                cards.indexOf($scope.card),
                                              1); // remove the card.
                        },
                        function(error){
                            //failure
                            console.log("There was an error: " + error);
                        })
                        .finally(function() {
                            $scope.edit = false;
                        });
                };
            }]

        };
    }
})();