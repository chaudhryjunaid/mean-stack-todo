todoApp.controller('LoginCtrl', ['$scope', 'Global', 'User', '$location',function ($scope, Global, User, $location) {
    $scope.global = Global;

    $scope.email = '';
    $scope.password = '';

    $scope.login = function(){
        User.login($scope.email,$scope.password).then(function(response){
            console.log('Response is: '+JSON.stringify(response));
            console.log('Test');
            if(!!response.data.data && !!response.data.data.user){
                $location.path("/todo");
            }
        }).catch(function(err){
            console.log(err);
        });
    };
}]);
