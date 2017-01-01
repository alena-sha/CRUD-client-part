var app = angular.module('employeesApp', [ 'i18n','routes','ngMaterial','ngMessages','xeditable','employeeModule','loginModule','taskModule' ]);


app.run(function($rootScope, $location, editableOptions){
	$rootScope.noauth = false;
	editableOptions.theme = 'bs3'; 	//install bootstrap theme for editable list of tasks
	$rootScope.$on('$routeChangeStart', function(event, next, current){//change top menu dependent on page(on login page menu items are hidden) 
	    if ($location.path() == '/login'||$location.path() == '/') {
	    	$rootScope.hideit = true;
	    	if($location.path() == '/login'){//after logout ngMessage(unauthorized) should be hidden
	    		$rootScope.noauth = false;
	    	}
	    }else{
	    	$rootScope.hideit = false;
	    }
	  });
	});


//if user unauthorized shows ngMessage 

	


	
//custom directive for simple validation (required,minlength,maxlength)
app.directive('valid', function() {
    var directive = {};
    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "pages/employee/valid.tmpl.html";
    directive.scope = {
            name : "=name"
        }
    return directive;
});
//we have to create this directive because type="file" for input not built in???
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

// controller for i18n
app.controller('translateCtrl', function($scope, $translate) {
	// change lang
	$scope.changeLng = function(lang) {
		$translate.use(lang);
	}
	// check current lang:
	$scope.currentLng = function(lang) {
		return $translate.use() == lang;
	}
});

//sets date format for datepicker
app.config(function($mdDateLocaleProvider) {
	$mdDateLocaleProvider.formatDate = function(date) {
	    return moment(date).format('D/M/YYYY');
	};

	$mdDateLocaleProvider.parseDate = function(dateString) {
	    var m = moment(dateString, 'D/M/YYYY', true);
	    return m.isValid() ? m.toDate() : new Date(NaN);
	};
});