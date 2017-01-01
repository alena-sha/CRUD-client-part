var taskModule = angular.module('taskModule', [ 'ngResource', 'routes','ngMaterial','md.data.table' ]);

taskModule.factory('TaskService', function($resource, $rootScope,$location) {//makes request to server api and returns response
	return function(credentials) {
		return $resource('http://localhost:8080/crudProject/employee/:empId/task/:id', {},
				{
					
					'del' : {
						method : 'DELETE',
						headers : credentials
					},
					'get' : {
						method : 'GET',
						headers : credentials
					},
					'update':{
						method : 'POST',
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



taskModule.factory('helperTask', function(){//service for sending data from one controller to another
	var helper = {};
	helper.tasks = [];
	helper.task={};
	helper.taskId=0;
	helper.employeeId=0;
	helper.method="edit";
	return{ 
		setTasks: function(obj){
			helper.tasks=obj;
		},
		setEmployeeId: function(obj){
			helper.employeeId=obj;
		},
		setTaskId: function(obj){
			helper.taskId=obj;
		},
		setMethod: function(obj){
			helper.method=obj;
		},
		getTasks: function(){
			return helper.tasks;
		},
		getEmployeeId: function(){
			return helper.employeeId;
		},
		getTaskId: function(){
			return helper.taskId;
		},
		getMethod: function(){
			return helper.method;
		},
		clear: function(){
			helper={};
			
	  },
	  	
	}
});




taskModule.controller('TasksController', [ '$scope', '$rootScope', '$location','$mdDialog','TaskService','helperTask',
		function($scope, $rootScope,$location,$mdDialog, TaskService,helperTask) {
	
	
			$scope.taskList=function(empId,$event){
			
			var	tasks=TaskService($rootScope.credentials).query({
					empId : empId}).$promise.then(function(tasks) {
						helperTask.setTasks(tasks);
						helperTask.setEmployeeId(empId);
						console.log(tasks.length);
						$scope.clearSelected();
						$mdDialog.show({
						      controller: 'TaskDialogController',
						      templateUrl: 'pages/task/tasks.tmpl.html',
						      parent: angular.element(document.body),
						      targetEvent: $event,
						      clickOutsideToClose:true
						    
						});
						
					});
					
			
			};
}]);			
	
taskModule.controller('TaskDialogController', [  '$scope','$rootScope','$mdDialog','helperTask','TaskService','$http',
			                                               		function($scope,$rootScope,$mdDialog,helperTask,TaskService,$http) {
    
	$scope.tasks=helperTask.getTasks();
	$scope.priorities = [
	                    {value: 1, text: 'high'},
	                    {value: 2, text: 'medium'},
	                    {value: 3, text: 'low'},
	                    
	                  ]; 
	$scope.saveTask = function(data,id) {
			$http.defaults.headers.post= {'Content-Type': 'application/json'};
			if(helperTask.getMethod()=="edit"){
				angular.extend(data, {id: id});
				var empId=helperTask.getEmployeeId();
				TaskService($rootScope.credentials).update({
				empId : empId},data);
			}else{
				var empId=helperTask.getEmployeeId();
				$scope.head=$http.defaults.headers.post;
				var task= TaskService($rootScope.credentials).update({
					empId : empId},data).$promise.then(function(task) {
					      helperTask.setMethod("edit");
					      $scope.tasks.pop();
					      $scope.tasks.push(task);
					});
			}
				
	}
	
	$scope.addTask = function() {
		helperTask.setMethod("add");	
		$scope.inserted = {
		     	
		      name: '',
		      content: '',
		      priority: '' 
		    };
		    $scope.tasks.push($scope.inserted);
	};
		  
	$scope.removeTask = function(task) {
		var id=task.id;
		var empId=helperTask.getEmployeeId();
		TaskService($rootScope.credentials).del({
					empId : empId, id:id});
		$scope.tasks.splice($scope.tasks.indexOf(task), 1);
		
		};  
	$scope.closeDialog=function(){
		$scope.$parent.selected=[];
		$mdDialog.hide();
	}
	
			
		
}]);	
				  
				



