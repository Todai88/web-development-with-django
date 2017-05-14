(function() {
    "use strict";

    angular.module("scrumboard.demo")
           .service("Login", ["$http", "$location", Login]);

    function Login($http, $location) {

        this.login = login;
        this.isLoggedIn = isLoggedIn;
        this.logout = logout;
        this.redirectifNotLoggedIn = redirectifNotLoggedIn;

        function login(credentials) {
            return $http.post("/auth_api/login/", credentials)
                    .then(function (response) {
                        //success
                        localStorage.currentUser = JSON.stringify(response.data);
                    },
                    function (error) {
                        //failure
                    });
        }

        function isLoggedIn() {
            return !!localStorage.currentUser;
        }

        function logout() {
            delete localStorage.currentUser;
            $http.get("/auth_api/logout/")
                 .then(function(response) {
                    //success
                    $location.url("/login");
                 },
                 function(error){
                    //failure
                    console.log("Some error occured... " + error);
                 });
        }

        function redirectifNotLoggedIn() {
            if (!isLoggedIn()) {
                $location.url('/login');
            }
        }
    }
})();