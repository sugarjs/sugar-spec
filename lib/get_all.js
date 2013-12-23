var async = require('async');


module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        // TODO: move into an array and generate creates based on these
        var firstData = {name: 'Jack'};
        var secondData = {name: 'Joe'};

        async.series([
            api.create.bind(null, firstData),
            api.create.bind(null, secondData),
            getAll
        ], cb);

        function getAll(cb) {
            sugar.getAll(schemas.Author, function(err, d) {
                assert.equal(d.length, 2);

                // TODO: check just if the returned data contains (no need for order)
                assert.equal(d[0].name, firstData.name);
                assert.equal(d[1].name, secondData.name);

                cb(err, d);
            });
        }
    };
};
