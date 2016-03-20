
angular.module('app', ['ngRoute']);

(function () {

    function MainCtrl($route, $routeParams, $location) {

        // Base URL for images
        this.base = "http://js4lcaeq.github.io/Coursera4/Coursera4/images/";
        // Images array: p - preview image name, v - original image name
        this.images = [
            { p: "av_h_s1.jpg", v: "27S.jpg" },
            { p: "11S_.jpg", v: "11S.jpg" },
            { p: "16S_.jpg", v: "16S.jpg" },
            { p: "28S_.jpg", v: "28S.jpg" },
            { p: "29S_.jpg", v: "29S.jpg" },
            { p: "3S_.jpg", v: "3S.jpg" },
            { p: "4S_.jpg", v: "4S.jpg" },
            { p: "9S_.jpg", v: "9S.jpg" }
        ];

        this.location = $location;
        this.route = $route;
        this.current = false;


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

    function Router($routeProvider) {
        $routeProvider

            .when('/home', {
                template:
'<div ng-if="ctrl.current"  id="view-image-box" ng-click="ctrl.close()">' +
'  <img ng-src="{{ctrl.base}}{{ctrl.current}}" alt="big view" title="click me"/>' +
'</div>' +
'<div class="container-fluid">' +
'  <div class="row gallery-box">' +
'    <div class="col-xs-6 col-sm-3 col-md-2 " ng-repeat="item in ctrl.images">' +
'      <img ng-src="{{ctrl.base}}{{item.p}}" alt="preview" class="img-thumbnail" ng-click="ctrl.open(item.v)" title="click me" />' +
'    </div>' +
'  </div>' +
'</div>'
            })

            .when('/about', {
                template:
'<div class="jumbotron">' +
'  <div class="container">' +
'    <h1>Simple Gallery</h1>' +
'    <p>Made for "Advanced Styling with Responsive Design" course by Colleen van Lent, Ph.D. from University of Michigan.</p>' +
'    <p>Powered by Bootstrap, jQuery and AngularJS.</p>' +
'  </div>' +
'</div>'
            })

            .otherwise('/home');
    }

    angular.module('app').config(Router);

})();

//angular.bootstrap("html", ['app']);



