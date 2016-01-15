'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var config = require('../../config/config');

exports.render = function(req, res) {
    res.sendFile(config.root+'/public/index.html');
};
