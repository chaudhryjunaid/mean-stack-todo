'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');
var winston = require('../../config/winston');

/**
 * Find todo by id
 * Note: This is called every time that the parameter :todoId is used in a URL.
 * Its purpose is to preload the article on the req object then call the next function. 
 */
exports.todo = function(req, res, next, id) {
    winston.verbose('todo id => ' + id);
    db.Todo.find({ where: {id: id}, include: [db.User]}).then(function(todo){
        if(!todo) {
            return next(new StandardError('Failed to load todo ' + id));
        } else {
            req.todo = todo;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a todo
 */
exports.create = function(req, res, next) {
    // augment the todo by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.Todo.create(req.body).then(function(todo){
        if(!todo){
            throw new StandardError({message:'Todo could not be created'});
        } else {
            return res.jsonp(todo);
        }
    }).catch(function(err){
        next(err);
    });
};

/**
 * Update a todo
 */
exports.update = function(req, res, next) {

    // create a new variable to hold the todo that was placed on the req object.
    var todo = req.todo;

    todo.updateAttributes({
        item: req.body.item
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        next(err);
    });
};

/**
 * Delete a todo
 */
exports.destroy = function(req, res, next) {

    // create a new variable to hold the article that was placed on the req object.
    var todo = req.todo;

    todo.destroy().then(function(){
        return res.jsonp(todo);
    }).catch(function(err){
        next(err);
    });
};

/**
 * Show a todo
 */
exports.show = function(req, res) {
    // Sending down the todo that was just preloaded by the todo.todo function
    return res.jsonp(req.todo);
};

/**
 * List of Todos
 */
exports.all = function(req, res) {
    db.Todo.findAll({include: [db.User]}).then(function(todos){
        return res.jsonp(todos);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * List of Todos
 */
exports.all = function(req, res) {
    db.Todo.findAll({include: [db.User]}).then(function(todos){
        return res.jsonp(todos);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Todo authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.todo.User.id !== req.user.id) {
      return next(new StandardError({
          httpStatus: 401,
          message: 'User is not authorized.'
      }));
    }
    next();
};
