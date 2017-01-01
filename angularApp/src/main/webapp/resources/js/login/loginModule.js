var loginModule = angular.module('loginModule',['routes']);

loginModule.factory('myIntercepter', ['$rootScope', '$location', function($rootScope, $location) {
	  var myIntercepter = {
	 	    responseError: function(response) {
	 	        if (response.status == 401){
	        	$rootScope.noauth = true;
	        	$location.path("/");
	 	        }
	 	    }	
	  }
	  return myIntercepter;
	}]);
	 
loginModule.config(['$httpProvider', function($httpProvider) {
	    $httpProvider.interceptors.push('myIntercepter');
	}]);
	


loginModule.controller('LoginController', [
		'$scope',
		'$rootScope',
		'$location',
		'EmployeeService','helper',
		function($scope, $rootScope, $location, EmployeeService, helper) {
			
			$scope.login = function() {
				if($scope.loginForm.$valid){
								
					var credentials = $scope.credentials ? {
					'Authorization' : "Basic "
							+ btoa($scope.credentials.username + ":"
									+ $scope.credentials.password)
					} : {};
			
					$rootScope.credentials = credentials;
					var employees = EmployeeService($rootScope.credentials).query();
					helper.setEmployees(employees);
					$location.path("/list");
				    					
				}else{
					$location.path("/");
				}
			}
		} ]);