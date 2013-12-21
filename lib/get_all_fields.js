var async = require('async');


module.exports = function(sugar, models, assert, api) {
    return function getAllFields(cb) {
        var firstData = {name: 'Jack', extra: ['foo', 'bar']};
        var secondData = {name: 'Joe', extra: ['boo', 'moo']};

        async.series([
            api.create.bind(null, firstData),
            api.create.bind(null, secondData),
            getAllArray,
            getAll
        ], cb);

        function getAllArray(cb) {
            sugar.getAll(models.Author, {fields: ['name']}, assertGetAll(cb));
        }

        function getAll(cb) {
            sugar.getAll(models.Author, {fields: 'name'}, assertGetAll(cb));
        }

        function assertGetAll(cb) {
            return function(err, d) {
                assert.equal(d.length, 2);

                // TODO: no need for these to be in order
                assert.equal(d[0].name, firstData.name);
                assert.equal(d[0].extra, undefined);
                assert.equal(d[1].name, secondData.name);
                assert.equal(d[1].extra, undefined);

                cb(err, d);
            };
        }
    };
};
