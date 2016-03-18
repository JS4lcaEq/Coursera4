
angular.module('app', ['ngRoute']);

(function () {

    function MainCtrl($route, $routeParams, $location, $http, TreeService) {
        this.test = "test";
        this.location = $location;
        this.route = $route;
    }

    angular.module('app').controller('MainCtrl', MainCtrl);

})();

//angular.bootstrap("html", ['app']);



