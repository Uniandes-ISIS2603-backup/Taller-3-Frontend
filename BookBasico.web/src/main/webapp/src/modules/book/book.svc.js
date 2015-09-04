(function (ng) {
    var mod = ng.module('bookModule');

    mod.service('bookService', ['Restangular', 'bookContext', function (RestAngular, context) {
            this.api = RestAngular.all(context);

            this.fetchRecords = function () {
                return this.api.getList();
            };

            this.fetchRecord = function (record) {
                return record.get();
            };
            this.saveRecord = function (currentRecord) {
                if (currentRecord.id) {
                    return currentRecord.put();
                } else {
                    return this.api.post(currentRecord);
                }
            };
            this.deleteRecord = function (record) {
                return record.remove();
            };
        }]);
})(window.angular);
