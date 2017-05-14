(function() {

    "use strict";

    angular.module("scrumboard.demo")
        .controller("LoginController",
                    ["$scope", "$http", "$location", LoginController]);

    function LoginController($scope, $http, $location) {

        $scope.login = function () {

            $http.post('/auth_api/login/', $scope.user)
                .then(function (response){
                    $location.url("/");
                },
                function(error) {
                    //failure
                    $scope.login_error = "Invalid username or password";
                });
        };
    };

})();