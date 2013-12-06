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
            if(is.fn(fields)) return fields();

            cb();
        },
        getOne: function(model, fields, cb) {
            cb();
        },
        getOrCreate: function(model, fields, cb) {
            cb();
        },
        getAll: function(model, fields, cb) {
            if(is.fn(fields)) return fields();

            cb();
        },
        create: function(model, data, cb) {
            cb();
        },
        update: function(model, id, data, cb) {
            cb();
        },
        remove: function(model, id, cb) {
            cb();
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
        }
    };
    var assert = {
        equal: function() {},
        ok: function() {}
    };

    tests({
        sugar: sugar,
        assert: assert
    });
}

function noop() {}
