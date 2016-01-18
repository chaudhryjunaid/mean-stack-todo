todoApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'partials/login.html',
        controller:'LoginCtrl'
    }).otherwise({
        redirectTo:'/'
    });
}]);
