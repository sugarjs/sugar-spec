var async = require('async');
var funkit = require('funkit');
var equals = funkit.ops.equals;


module.exports = function(sugar, models, assert, api) {
    return function getAllAuthorsLimit(cb) {
        var firstData = {name: 'Jack', extra: ['foo', 'bar']};
        var secondData = {name: 'Joe', extra: ['boo', 'moo']};

        async.series([
            api.create.bind(null, firstData),
            api.create.bind(null, secondData),
            getAll
        ], cb);

        function getAll(cb) {
            sugar.getAll(models.Author, {limit: 1}, function(err, d) {
                assert.equal(d && d.length, 1);

                // TODO: no need for these to be in order
                assert.equal(d && d[0].name, firstData.name);
                assert.ok(equals(d && d[0].extra, firstData.extra));

                cb(err, d);
            });
        }
    };
};
