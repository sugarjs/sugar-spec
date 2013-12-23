var async = require('async');

var specs = require('require-dir')('.');


module.exports = function(o) {
    if(!o.sugar) {
        return console.warn('Missing sugar!');
    }
    // address, engine and assert are optional
    if(!o.assert) {
        o.assert = require('assert');
    }

    var schemas = require('../schemas')(o.sugar, o.engine);
    var api = require('./api')(o.sugar, schemas, o.assert);
    var tests = Object.keys(specs).map(function(name) {
        return {
            name: name,
            test: specs[name](o.sugar, schemas, o.assert, api)
        };
    });

    console.log('Executing tests!');

    o.sugar.connect(o.address, function(err) {
        if(err) {
            return console.error('Failed to connect to database!', err);
        }

        async.series(setup(tests, removeData.bind(null, o.sugar, schemas)), function() {
            console.log('Tests executed!');

            o.sugar.disconnect(noop);
        });
    });
};

function removeData(sugar, schemas, t) {
    return function(cb) {
        async.series([
            sugar.removeAll.bind(null, schemas.Author),
            sugar.removeAll.bind(null, schemas.Library),
            sugar.removeAll.bind(null, schemas.LibraryAuthor)
        ], t.bind(undefined, cb));
    };
}

function setup(tests, fn) {
    return tests.map(function(t) {
        return function(cb) {
            console.log('Executing', t.name);

            fn(t.test)(cb);
        };
    });
}

function noop() {}

