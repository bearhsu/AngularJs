eApp.controller('main', function ($scope, $http, $controller, sysInfoService, $q) {
    
    $controller('BaseController', {
        $scope: $scope
    });
    $scope.controllerName = 'main';
    
    var log = console.log;
    var table = console.table;
    
    $scope.init = function () {
        
        $scope.main = {
            query: false,
            maintenance: false,
            data: [],
            param: [],
            order: 'CUST_ID'
        };
        
        // 接收來自query-template的事件(查詢)
        $scope.$on('query', function(event, data) {
            // 放出訊息讓result做filter
            $scope.$broadcast('doQuery',data);
        });
        
        // 接收來自result的事件(查詢)
        $scope.$on('getMaintenanceData', function(event, data) {
            // 放出資料讓maintenance接收
            $scope.$broadcast('receive',data);
        });
        
        $q.all([getData(),getParam()]).then(function(result) {
            $scope.main.param = result[1];
            $scope.main.data = result[0];
        });
        
        function getData() {
            var deffered = $q.defer();
            $http.get("data/data.json").then(function (response) {
                deffered.resolve(response.data);
            });
            return deffered.promise;
        }
        
        function getParam() {
            var deffered = $q.defer();
            $http.get("data/param.json").then(function (response) {
                deffered.resolve(response.data);
            });
            return deffered.promise;
        }
    }
    $scope.init();
});
