eApp.controller('resultController', function ($scope, $controller) {

    $controller('BaseController', {
        $scope: $scope
    });

    $scope.controllerName = 'resultController';
    $scope.limit = 10;

    var log = console.log;

    $scope.init = function () {
        $scope.filter = {
            CUST_ID: '',
            CUST_NAME: '',
            VIP_CODE: '',
            ENTRY_DATE: ''
        };
        $scope.upOrDown = false;
        // trigger for paging
        $scope.count = 0;
    }

    $scope.change = function (field) {
        if (field == $scope.main.order) {
            $scope.upOrDown = $scope.upOrDown ? false : true;
        } else {
            $scope.main.order = field;
        }
        $scope.count ++;
    }

    $scope.transfer = function (data) {
        if ($scope.main.maintenance) {
            $scope.$emit('getMaintenanceData', data);
        }
    }

    $scope.$on('doQuery', function (event, data) {
        $scope.filter.CUST_ID = data.custId || '';
        $scope.filter.CUST_NAME = data.custName || '';
        $scope.filter.ENTRY_DATE = data.entryDate || '';
        $scope.filter.VIP_CODE = data.vipCode || '';
        // trigger paging directive
        $scope.count ++;
    });

    $scope.init();
});