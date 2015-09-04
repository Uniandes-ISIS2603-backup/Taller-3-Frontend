(function (ng) {
    var mod = ng.module('bookModule');

    mod.controller('bookCtrl', ['$scope', 'bookService', function ($scope, svc) {
            $scope.currentRecord = {};
            $scope.records = [];

            //Variables para el controlador
            this.readOnly = false;
            this.editMode = false;

            var self = this;
            this.createRecord = function () {
                this.editMode = true;
                $scope.currentRecord = {};
            };

            this.editRecord = function (record) {
                return svc.fetchRecord(record).then(function (data) {
                    $scope.currentRecord = data;
                    self.editMode = true;
                    return data;
                });
            };

            this.fetchRecords = function () {
                return svc.fetchRecords().then(function (data) {
                    $scope.records = data;
                    $scope.currentRecord = {};
                    self.editMode = false;
                    return data;
                });
            };
            this.saveRecord = function () {
                return svc.saveRecord($scope.currentRecord).then(function () {
                    self.fetchRecords();
                });
            };
            this.deleteRecord = function (record) {
                return svc.deleteRecord(record).then(function () {
                    self.fetchRecords();
                });
            };

            this.fetchRecords();
        }]);
})(window.angular);
