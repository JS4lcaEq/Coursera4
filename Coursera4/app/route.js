angular.module('app').config(function ($routeProvider) {

    $routeProvider

        .when('/home', {
            templateUrl: 'templates/home.html'
            , resolve: { name: function ($http) { return "return"; } }
            , custom: "customVal"
        })

        .when('/about', {
            templateUrl: 'templates/about.html'
            //, resolve:{name:"route"}
        })

        .when('/help', {
            templateUrl: 'templates/help.html'
            //, resolve:{name:"route"}
        })

        .otherwise('/home');
});