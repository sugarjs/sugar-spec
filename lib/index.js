var async = require('async');

var specs = require('require-dir')('.');


module.exports = function(o) {
    if(!o.sugar) return console.warn('Missing sugar!');
    // address, engine and assert are optional
    if(!o.assert) o.assert = require('assert');

    var models = require('../models')(o.sugar, o.engine);
    var api = require('./api')(o.sugar, models, o.assert);
    var tests = Object.keys(specs).map(function(name) {
        return specs[name](o.sugar, models, o.assert, api);
    });

    console.log('Executing tests!');

    o.sugar.connect(o.address, function(err) {
        if(err) return console.error('Failed to connect to database!', err);

        async.series(setup(tests, removeData.bind(null, o.sugar, models)), function() {
            console.log('Tests executed!');

            o.sugar.disconnect(function() {
                process.exit();
            });
        });
    });
};

function removeData(sugar, models, t) {
    return function(cb) {
        async.series([
            sugar.removeAll.bind(null, models.Author),
            sugar.removeAll.bind(null, models.Library),
            sugar.removeAll.bind(null, models.LibraryAuthor)
        ], t.bind(undefined, cb));
    };
}

function setup(tests, fn) {
    return tests.map(function(t) {
        return function(cb) {
            console.log('Executing', t.name);

            fn(t)(cb);
        };
    });
}
