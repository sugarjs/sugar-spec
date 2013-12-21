var async = require('async');


module.exports = function(sugar, models, assert, api) {
    return function getAll(cb) {
        // TODO: move into an array and generate creates based on these
        var firstData = {name: 'Jack'};
        var secondData = {name: 'Joe'};

        async.series([
            api.create.bind(null, firstData),
            api.create.bind(null, secondData),
            get
        ], cb);

        function get(cb) {
            sugar.getAll(models.Author, function(err, d) {
                assert.equal(d.length, 2);

                // TODO: check just if the returned data contains (no need for order)
                assert.equal(d[0].name, firstData.name);
                assert.equal(d[1].name, secondData.name);

                cb(err, d);
            });
        }
    };
};
