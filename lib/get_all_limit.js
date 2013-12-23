var async = require('async');
var funkit = require('funkit');
var equals = funkit.ops.equals;


module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        var firstData = {name: 'Jack', extra: ['foo', 'bar']};
        var secondData = {name: 'Joe', extra: ['boo', 'moo']};

        async.series([
            api.create.bind(null, firstData),
            api.create.bind(null, secondData),
            getAll
        ], cb);

        function getAll(cb) {
            sugar.getAll(schemas.Author, {limit: 1}, function(err, d) {
                assert.equal(d.length, 1);

                // TODO: no need for these to be in order
                assert.equal(d[0].name, firstData.name);
                assert.ok(equals(d[0].extra, firstData.extra));

                cb(err, d);
            });
        }
    };
};
