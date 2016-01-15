'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var passport = require('passport');

var db = require('../../config/sequelize');
var winston = require('../../config/winston');

/**
 * Login
 */

exports.login = function (req, res, next) {
    winston.info('Request Obj: ',req.body);

    passport.authenticate('local', function (err, user, info) {

        if (err) {
            return next(new StandardError({message: "Error in login"}));
        }
        else if (!user) {
            return next(new StandardError({message: info.message}));
        }
        else {
            req.login(user, function (err) {
                if (err) {
                    next(err);
                }
                user = user.get({plain:true});
                res.send({
                    data: {
                        user: user
                    }
                });
            });
        }

    })(req, res, next);
};

/**
 * Logout
 */
exports.logout = function(req, res) {
    winston.info('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
    req.logout();
    res.send({
        message:'Logout successful.'
    });
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var message = null;

    if(!req.body.password){
        return next(new StandardError({
            name:'EmptyPasswordError',
            message:'Password cannot be empty.'
        }));
    }
    var user = db.User.build(req.body);
    winston.info('New User (local) : { id: ' + user.id + ' username: ' + user.username + ' }');

    user.salt = user.makeSalt();
    user.hashedPassword = user.encryptPassword(req.body.password,user.salt);

    user.save().then(function(){
        req.login(user, function(err){
            if(err) {
                return next(err);
            }
            res.send({
                message:'User created successfully.',
                data:{
                    user:user
                }
            });
        });
    }).catch(function(err){
        next(err);
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    db.User.find({where : { id: id }}).then(function(user){
        if (!user) {
            return next(new StandardError('Failed to load User ' + id));
        }
        req.profile = user;
        next();
    }).catch(function(err){
        next(err);
    });
};

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(new StandardError({
            message:'User is not authorized',
            httpStatus:401
        }));
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.profile.id !== req.user.id) {
        return next(new StandardError({
            message:'User is not authorized',
            httpStatus:401
        }));
    }
    next();
};
