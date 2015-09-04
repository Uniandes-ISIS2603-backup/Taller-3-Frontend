(function (ng) {
    var mod = ng.module('bookModule');

    mod.controller('bookCtrl', ['$scope', 'bookService', function ($scope, svc) {
            $scope.currentRecord = {};
            $scope.records = [];
            $scope.alerts = [];

            //Alertas
            this.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            function showMessage(msg, type) {
                var types = ['info', 'danger', 'warning', 'success'];
                if (types.some(function (rc) {
                    return type === rc;
                })) {
                    $scope.alerts.push({type: type, msg: msg});
                }
            }

            this.showError = function (msg) {
                showMessage(msg, 'danger');
            };

            function responseError(response) {
                self.showError(response.data);
            }

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
                }, responseError);
            };
            this.deleteRecord = function (record) {
                return svc.deleteRecord(record).then(function () {
                    self.fetchRecords();
                }, responseError);
            };

            this.fetchRecords();
        }]);
})(window.angular);
