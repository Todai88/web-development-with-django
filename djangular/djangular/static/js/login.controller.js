(function() {

    "use strict";

    angular.module("scrumboard.demo")
        .controller("LoginController",
                    ["$scope", "$http", "$location", "Login", LoginController]);

    function LoginController( $scope, $http, $location, Login ) {

        $scope.login = function () {
            Login.login($scope.user)
                 .then(function (response) {
                    $location.url('/');
                 },
                 function (error) {
                    $scope.login_error = "Invalid username or password";
                 });
            };

            if (Login.isLoggedIn()) {
                $location.url('/');
            }
            /*

            DEPRICATED!!!

            $http.post('/auth_api/login/', $scope.user)
                .then(function (response){
                    $location.url("/");
                },
                function(error) {
                    //failure
                    $scope.login_error = "Invalid username or password";
                });*/
    };

})();