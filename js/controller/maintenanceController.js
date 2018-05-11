eApp.controller('maintenanceController', function($scope, $controller) {
    
    $controller('BaseController',{
        $scope: $scope
    });
    
    $scope.$on('receive', function(event, data) {
        angular.copy(data,$scope.tmpData);
        $scope.tmpData.ENTRY_DATE = new Date(data.ENTRY_DATE);
    });
    
    $scope.init = function() {
        $scope.tmpData = {
            CUST_ID: '',
            CUST_NAME: '',
            VIP_CODE: '',
            ENTRY_DATE: '',
            DEPOSIT: ''
        };
    }
    
    $scope.maintenance = function() {
        for(var i in $scope.main.data) {
            if($scope.main.data[i].CUST_ID == $scope.tmpData.CUST_ID) {
                $scope.main.data[i] = angular.extend($scope.main.data[i],removeNull($scope.tmpData));
                isChange = true;
                alert('修改成功!');
                return;
            }
        }
        alert('找無此會員: ' + $scope.tmpData.CUST_ID);
    }
    
    function removeNull(data) {
        var copy = angular.copy(data);
        for(var i in copy) {
            if(copy[i] == null || copy[i] == '' || copy[i] == undefined) {
                delete copy[i];
            }
        }
        return copy;
    }
    
    $scope.init();
});