todoApp.controller('TodoCtrl', ['$scope', 'Global', 'User', '$location','Todo',function ($scope, Global, User, $location, Todo) {
    $scope.global = Global;

    $scope.todolist = Todo.todoResource.$query;

    $scope.addTodoItem = function(){
        console.log('Add todo called.');
        var newTodo = new Todo.todoResource();
        newTodo.item = $scope.item;
        newTodo.$save().then(function(response){
            console.log(JSON.stringify(response));
            $scope.todolist = Todo.todoResource.$query();
        }).catch(function(err){
            console.log(err.message);
        });
    };
}]);
