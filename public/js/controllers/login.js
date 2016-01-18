todoApp.controller('LoginCtrl', ['$scope', 'Global', 'User', function ($scope, Global, User) {
    $scope.global = Global;

    $scope.email = '';
    $scope.password = '';

    $scope.login = function(){
        User.login($scope.email,$scope.password).then(function(response){
            console.log('Response is: '+response);
        }).catch(function(err){
            console.log(err);
        });
    };
}]);
