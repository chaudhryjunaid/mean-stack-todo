todoApp.controller('TodoCtrl', ['$scope', 'Global', 'User', '$location','Todo',function ($scope, Global, User, $location, Todo) {
    $scope.global = Global;

    Todo.todoResource().query(function(data){
        $scope.todolist = data;
    });

    $scope.addTodoItem = function(){
        console.log('Add todo called.');
        if(!$scope.item){
            return;
        }
        Todo.todoResource().save({item:$scope.item},function(response){
            console.log(JSON.stringify(response));
            $scope.item = "";
            $scope.todolist = Todo.todoResource().query();
        },function(error){
            console.log(JSON.stringify(error));
            alert('The todo item could not be saved!');
        });
    };
}]);
