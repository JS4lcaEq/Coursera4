
angular.module('app', ['ngRoute']);

(function () {

    function MainCtrl($route, $routeParams, $location, $http, TreeService) {
        this.test = "test";
        this.location = $location;
        this.route = $route;
        this.current = false;
        this.images = [
            { p: "av_h_s1.jpg", v: "27S.jpg" },
            { p: "9S_.jpg", v: "9S.jpg" }
        ];
        this.open = function (item) {
            var self = this;
            self.current = item;
        };
        this.close = function () {
            var self = this;
            self.current = false;
        };

    }

    angular.module('app').controller('MainCtrl', MainCtrl);

})();

//angular.bootstrap("html", ['app']);



