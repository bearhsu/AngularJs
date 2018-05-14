eApp.controller('resultController', function ($scope, $controller, $filter) {

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
            $scope.upOrDown = !$scope.upOrDown;
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

    $scope.$watch('count',function() {
        $scope.list = $filter('filter')($scope.main.data, $scope.filter);
        $scope.list = $filter('vipCode')($scope.list, $scope.main.param);
        $scope.list = $filter('orderBy')($scope.list, $scope.main.order, $scope.upOrDown);
    });
    
    $scope.init();
});