(function (ng) {
    var mod = ng.module('bookModule', ['ui.bootstrap', 'restangular']);

    mod.constant('bookContext', 'books');

})(window.angular);
