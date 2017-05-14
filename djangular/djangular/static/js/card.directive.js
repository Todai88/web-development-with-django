(function () {
    "use strict";

    angular.module('scrumboard.demo')
        .directive('scrumboardCard', CardDirective);

    function CardDirective() {
        return {
            templateUrl: "/static/html/card.html",
            restrict: 'E',
            controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
                let url = '/scrumboard/cards/' + $scope.card.id + '/';
                $scope.destList = $scope.list;

                $scope.update = function() {
                    return $http.put(url, $scope.card)
                        .finally(function() {
                            $scope.edit = false;
                        });
                };

                function removeCardFromList(card, list) {
                    let cards = list.cards;
                    cards.splice(
                        cards.indexOf(card),
                        1
                    );
                }

                $scope.delete = function() {
                    $http.delete(url)
                        .then(function(response){
                            //success
                            removeCardFromList($scope.card, $scope.list);
                        },
                        function(error){
                            //failure
                            console.log("There was an error: " + error);
                        })
                        .finally(function() {
                            $scope.edit = false;
                        });
                };

                $scope.move = function() {

                    if ($scope.destList === undefined) {
                        return;
                    }

                    $scope.card.list = $scope.destList.id;
                    $scope.update()
                        .then(function (response) {
                            {
                            removeCardFromList($scope.card, $scope.list);
                            $scope.destList.cards.push($scope.card);
                            }
                        }, function (error) {
                            console.log("Some error: " + error);
                        })
                        .finally(function() {
                            $location.url('/');
                        });
                }
            }]

        };
    }
})();