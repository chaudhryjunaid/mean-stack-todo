'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var config = require('../../config/config');
var winston = require('../../config/winston');

exports.render = function(req, res) {
    winston.info('Loading index route...');
    res.sendFile(config.root+'/public/index.html');
};
