'use strict';

var index = require('../../app/controllers/index');
var user = require('../controllers/user');
var todo = require('../controllers/todo');

module.exports = function(app) {

    // Home route
    app.get('/', index.render);

    // User routes
    app.post('/login', user.login);
    app.get('/logout', user.logout);
    app.get('/user/me', user.me);

    app.post('/user', user.create);

    // Finish with setting up the userId param
    app.param('userId', user.user);

    // Todo Routes
    app.route('/todo')
        .get(todo.all)
        .post(user.requiresLogin, todo.create);
    app.route('/todo/:todoId')
        .get(todo.show)
        .put(user.requiresLogin, todo.hasAuthorization, todo.update)
        .delete(user.requiresLogin, todo.hasAuthorization, todo.destroy);

    // Finish with setting up the todoId param
    app.param('todoId', todo.todo);
};

