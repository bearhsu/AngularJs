eApp.controller('templateController', function($scope, $controller) {
    
    $controller('BaseController', {
        $scope: $scope
    });
    
    $scope.controllerName = 'templateController';
});