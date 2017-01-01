var app=angular.module('routes', ['ngRoute','employeesApp']);
 
app.config(function($routeProvider) {
  $routeProvider
  .when('/login', {
	    templateUrl : 'pages/login.html',
	    controller  : 'LoginController'
	  })
  .when('/', {
    templateUrl : 'pages/login.html',
    controller  : 'LoginController'
  })
 .when('/list', {
    templateUrl : 'pages/employee/list.tmpl.html',
    controller  : 'ListController'
  })
 
  .when('/edit/:empId', {
    templateUrl : 'pages/employee/edit.tmpl.html',
    controller  : 'EditController',
    /*resolve: {
    	flag:function(){return 'edit';}
    }*/
  })
   .when('/delete/:empId', {
    templateUrl : 'pages/employee/list.tmpl.html',
    controller  : 'DeleteController'
  })
  /*.when('/new', {
    templateUrl : 'pages/employee/edit.html',
    controller  : 'EditController',
     resolve: {
    	   flag: function(){return 'add';}
    	    }
  })*/  
  .otherwise({redirectTo: '/'});
});