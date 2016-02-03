todoApp.factory('Todo',['$resource', function($resource){
    return {
        todoResource: function(){
            return $resource('/todo/:id');
        }
    }
}]);
