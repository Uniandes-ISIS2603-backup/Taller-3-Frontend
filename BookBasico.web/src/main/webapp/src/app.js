(function (ng) {

    var mainApp = ng.module('mainApp', [
        'bookModule',
        'ngRoute',
        'restangular'
    ]);

    mainApp.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                    .when('/book', {
                        templateUrl: 'src/modules/book/book.tpl.html',
                        controller: 'bookCtrl',
                        controllerAs: 'ctrl'
                    })
                    .otherwise('/book');
        }]);

    mainApp.config(['RestangularProvider', function (rp) {
            rp.setBaseUrl('webresources');
            rp.addRequestInterceptor(function (data, operation) {
                if (operation === "remove") {
                    return null;
                }
                return data;
            });
        }]);
})(window.angular);
