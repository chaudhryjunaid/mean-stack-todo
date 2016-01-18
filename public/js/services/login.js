todoApp.factory('User',['$http', function($http){
    return {
        login: function(email, password){
            return $http.post('/login',{
                email: email,
                password: password
            });
        }
    }
}]);
