#!/usr/bin/env node
var is = require('is-js');

var tests = require('./lib');


main();

function main() {
    var sugar = {
        schema: function() {
            return function() {
                return {
                    fields: noop
                };
            };
        },
        mixed: noop,
        ref: noop,
        refs: noop,
        get: function(model, id, fields, cb) {
            if(is.fn(fields)) {
                return fields(null, {_id: 'foobar'});
            }

            cb(null, {name: 'foo'});
        },
        getOne: function(model, fields, cb) {
            cb(null, {name: 'foo'});
        },
        getOrCreate: function(model, fields, cb) {
            cb(null, {name: 'bar', _id: 'foo'});
        },
        getAll: function(model, fields, cb) {
            if(is.fn(fields)) {
                return fields(null, [{name: 'baz'}, {name: 'bar'}]);
            }

            cb(null, [{name: 'foo'}, {name: 'baz'}]);
        },
        create: function(model, data, cb) {
            var now = new Date();

            if(is.array(data)) {
                return cb(null, [{name: 'foo', created: now}, {name: 'bar', created: now}]);
            }

            return cb(null, {_id: 'foobar', created: now});
        },
        update: function(model, id, data, cb) {
            if(is.array(id)) {
                return cb(null, [{name: 'baz'}, {name: 'barbar'}]);
            }

            cb(null, {name: 'foo'});
        },
        remove: function(model, id, cb) {
            cb(null, [{}]);
        },
        removeAll: function(model, cb) {
            cb();
        },
        count: function(model, cb) {
            cb();
        },
        getMeta: function(model, cb) {
            cb();
        },
        connect: function(address, cb) {
            cb();
        },
        disconnect: function(cb) {
            cb();
        }
    };
    var assert = noop;

    assert.deepEqual = noop;
    assert.equal = noop;
    assert.ok = noop;

    tests({
        sugar: sugar,
        assert: assert
    });
}

function noop() {}
