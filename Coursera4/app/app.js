
angular.module('app', ['ngRoute']);

(function () {

    function MainCtrl($route, $routeParams, $location) {
        this.test = "test";
        this.location = $location;
        this.route = $route;
        this.current = false;
        this.images = [
            { p: "images/av_h_s1.jpg", v: "images/27S.jpg" },
            { p: "images/11S_.jpg", v: "images/11S.jpg" },
            { p: "images/16S_.jpg", v: "images/16S.jpg" },
            { p: "images/28S_.jpg", v: "images/28S.jpg" },
            { p: "images/29S_.jpg", v: "images/29S.jpg" },
            { p: "images/3S_.jpg", v: "images/3S.jpg" },
            { p: "images/4S_.jpg", v: "images/4S.jpg" },
            { p: "images/9S_.jpg", v: "images/9S.jpg" }
        ];
        this.open = function (item) {
            var self = this;
            self.current = item;
            self.current.maxWidth = $("html").width();
            self.current.maxHeight = $("html").height();           
        };
        this.close = function () {
            var self = this;
            self.current = false;
        };

    }

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
//style="max-width:{{ctrl.current.maxWidth}}px; max-height:{{ctrl.current.maxHeight}}px;"
angular.module('app').config(function ($routeProvider) {

    $routeProvider

        .when('/home', {
            template:
'<div id="view-image-box" ng-click="ctrl.close()" ng-if="ctrl.current" >' +
    '<img src="{{ctrl.current.v}}" alt="big view" title="click me"/>' +
'</div>'+
'<div class="container-fluid">'+
    '<div class="row gallery-box">'+
        '<div class="col-xs-6 col-sm-3 col-md-2 " ng-repeat="item in ctrl.images">'+
            '<img src="{{item.p}}" alt="preview" class="img-thumbnail" ng-click="ctrl.open(item)" title="click me" />'+
        '</div>'+
    '</div>'+
'</div>'
        })

        .when('/about', {
            template: '<div class="jumbotron"><div class="container"><h1>Simple Gallery</h1><p>Made for "Advanced Styling with Responsive Design" course by Colleen van Lent, Ph.D. from University of Michigan.</p><p>Powered by Bootstrap, jQuery and AngularJS.</p></div></div>'
        })

        .otherwise('/home');
});

//angular.bootstrap("html", ['app']);



