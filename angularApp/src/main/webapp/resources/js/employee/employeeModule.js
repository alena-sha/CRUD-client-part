var employeeModule = angular.module('employeeModule', [ 'ngResource', 'routes','ngMaterial','md.data.table' ]);

employeeModule.factory('EmployeeService', function($resource, $rootScope,$location) {//makes request to server api and returns response
	return function(credentials) {
		return $resource('http://localhost:8080/crudProject/employee/:id', {},
				{
					
					'del' : {
						method : 'DELETE',
						headers : credentials
					},
					'get' : {
						method : 'GET',
						headers : credentials
					},
					'query' : {
						method : 'GET',
						isArray : true,
						headers : credentials
					}
				})
	}
});



employeeModule.factory('helper', function(){//service for sending data from one controller to another
	var helper = {};
	helper.employees = [];
	helper.employee={};
	return{ 
		setEmployees: function(emp){
			helper.employees=emp;
		},
		getEmployees: function(){
			return helper.employees;
		},
		clear: function(){
			helper={};
			
	  },
	  setEmployee: function(emp){
			helper.employee=emp;
		},
		getEmployee: function(){
			return helper.employee;
		},
		
	}
});




employeeModule.controller('ListController', [ '$scope', '$rootScope', '$location','$mdDialog','EmployeeService','helper',
		function($scope, $rootScope,$location,$mdDialog, EmployeeService,helper) {
	
			$scope.employees=helper.getEmployees();
			$scope.selected = [];
			$scope.clearSelected=function(){
				$scope.selected=[];
			}
			$scope.edit=function(empId,$event){
				var method;
				var employee={};
				if(empId!=0){
					method="edit";
					employee = EmployeeService($rootScope.credentials).get({
						id : empId}).$promise.then(function(employee) {
						      helper.setEmployee(employee);
						      showDialog($scope,$mdDialog,$event,method);
								
				});}
				else{
					method="add";
					showDialog($scope,$mdDialog,$event,method);
				}
			}
			
			
			$scope.showImage=function(img,$event){
				 $mdDialog.show({
				      controller: 'ShowImageController',
				      templateUrl: 'pages/image.tmpl.html',
				      parent: angular.element(document.body),
				      targetEvent: event,
				      clickOutsideToClose:true,
				      locals:{image:img}
				    
				    }).then(function() {
				    	$scope.clearSelected();
				    }, function() {
				    	 $scope.clearSelected();
				    });
			}
			
			$scope.deleteEmp=function(selected,ev){
			
				if(selected.length!=0){
					
				 $mdDialog.show({
				      controller: 'DeleteDialogController',
				      templateUrl: 'pages/employee/confirm.tmpl.html',
				      parent: angular.element(document.body),
				      targetEvent: ev,
				      clickOutsideToClose:true
				    
				    }).then(function() {

				    	var employees=$scope.employees;
				    	for(var i=0;i<selected.length;i++){
				    			EmployeeService($rootScope.credentials).del({
							id : selected[i].id});
				    			for(var j=0;j<employees.length;j++){
				    				if(employees[j].id==selected[i].id){
				    					var index=employees.indexOf(employees[j]);
				    					$scope.employees.splice(index, 1);//update the view(list of employees) after deleting
				    				}	 
				    			}
				    	}	  
				    	 $scope.clearSelected();
				    }, function() {
				    	 $scope.clearSelected();
				    });
				}else{
					 $mdDialog.show({
					      controller: 'DeleteDialogController',
					      templateUrl: 'pages/employee/alert.tmpl.html',
					      parent: angular.element(document.body),
					      targetEvent: ev,
					      clickOutsideToClose:true
					    
					    })
				}
		  };
		  
		 
		  

		function showDialog($scope,$mdDialog,$event,method){
			$event.stopPropagation();
			$mdDialog.show({
			      controller: 'DialogEditController',
			      templateUrl: 'pages/employee/edit.tmpl.html',
			      targetEvent: $event,
			      parent: angular.element(document.body),
			      locals: {method:method}
			  }).then(function() {
				  $scope.employees=helper.getEmployees();
				  $scope.clearSelected();
						
			  }, function(){
				  $scope.clearSelected();
			  });
		};
}]);	
				  
				
employeeModule.controller('DeleteDialogController', [  '$scope','$mdDialog',
                            		function($scope,$mdDialog) {
   $scope.cancel = function() {
      $mdDialog.cancel();
    }
    $scope.confirm = function() {
      $mdDialog.hide();
    }
  }])
		  
employeeModule.controller('ShowImageController', [  '$scope','image',
                            		function($scope,image) {
   $scope.image=image;
  }])
		



employeeModule.controller('DialogEditController', [  '$scope','$rootScope', '$routeParams','$location','$mdDialog','$http',
		'EmployeeService','helper','method',
		function($scope,$rootScope, $routeParams, $location, $mdDialog,$http, EmployeeService,helper,method) {
		
		
		$scope.formErrors=false;
		$scope.mindate=new Date(1950,1,1);
		$scope.maxdate=new Date(2000,1,1);
		if(method=="edit"){
			$scope.employee=helper.getEmployee();
			var data=$scope.employee.dateOfBirth;
			var month = data.monthValue;
			var day = data.dayOfMonth;
			var dateString=day+"/"+month+"/"+data.year;
			var nowMoment=moment(dateString,'D/M/YYYY');
			$scope.dateObj=nowMoment.toDate();
		}else{
			$scope.dateObj=$scope.mindate;
		}
		
		$scope.saveEmployee = function() {
			if($scope.editForm.$invalid){
				$scope.formErrors=true;
			}
			else{
				var employee=$scope.employee;
				data=moment($scope.dateObj).add('days', 1);
				employee.dateOfBirth=data.toDate();
				
				$http.defaults.headers.post="'Content-Type': undefined";
				
				var fd = new FormData();
			    fd.append('data', JSON.stringify(employee));
			   	fd.append("file", $scope.image);	
			   
			    $http({
			        method: 'POST',
			        url: 'http://localhost:8080/crudProject/employee',
			        headers: $rootScope.credentials,  			         
			        data: fd,
			        transformRequest: angular.identity
			        })
			       .success(function(data, status) {
			             helper.setEmployees(EmployeeService($rootScope.credentials).query());
						 $mdDialog.hide();
			        });
				
			}
		}
		
		
		
		
		
		$scope.closeDialog = function() {
		    $mdDialog.hide();
		  //  $location.path("/list");
		}					
		
		}
	]);



