eApp.controller('queryController', function($scope, $controller) {
    
    $controller('BaseController', {
        $scope: $scope
    });
    
    $scope.init = function() {
        $scope.tmpData = {
            custId: '',
            custName: '',
            vipCode: '',
            entryDate: ''
        };
    }
    
    $scope.query = function() {
        $scope.$emit('query',$scope.tmpData);
    }
    
    $scope.init();
});