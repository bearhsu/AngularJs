/**===============================================================================
								  BaseController
==================================================================================
    @Author: Johnson
    @description: BaseLine Controller
    @LastUpdate: 2018/04/14
================================================================================*/
/** ------------------------------------------------------------------------------
 * 
 * 	[function] 
 * 
 * -----------------------------------------------------------------------------*/
eApp.controller('BaseController', function($rootScope, $scope, $http, $filter, $window, $timeout) {
    $scope.controllerName = ""; 
    $rootScope.language = $window.navigator.language || $window.navigator.userLanguage;
    /* current controller name */
    if($scope.$parent.controllerName){
    	$scope.localCtrl = $scope.$parent.controllerName;
    	$rootScope.localCtrl = $scope.localCtrl;
    }
    
    /**========================================================================
    @description: controller to controller, scope to scope.
    @parameter: 
    	type = 'set' || 'get'
    	name = 'dataName'
    	args = any kind of data
    @example: 
    ※'set':
    	var data = row;
    	$scope.connector('set','car', {
			speed: '',
			power: {

			},
			...
		});
    ※'get':
    	var car = $scope.connector('get','car');
    ※print:
    	$scope.connector();
    ==========================================================================*/
    $scope.connector = function (type, name, args) {
    	if(!type && !name && !args){
    		return;
    	};
    	//check parameter
    	if(!type || !name){
    		return;
		};
		//set id
		var id = angular.copy(name.toString().toUpperCase().trim());
		//select type
    	switch(type.toString().toUpperCase().trim()){
	    	case 'SET':
		    	var data = angular.copy(args);
		    	if($rootScope.server.id.indexOf(id)===-1){
		    		$rootScope.server.id.push(id);
		    		$rootScope.server.data.push(data);
		    	}else{
		    		$rootScope.server.data[$rootScope.server.id.indexOf(id)] = data;
		    	}
	    		break;
	    	case 'GET':
	    		if($rootScope.server.id.indexOf(id)===-1){
	    			return;
	    		}else{
	    			return (angular.copy($rootScope.server.data[$rootScope.server.id.indexOf(id)]));
	    		}
	    		break;
    		default:
    			return;
    	};
    };
    $rootScope.connector = $scope.connector;
});
