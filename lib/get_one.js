var async = require('async');


module.exports = function(sugar, models, assert, api) {
    return function getOne(cb) {
        var firstData = {name: 'Jack'};
        var secondData = {name: 'Joe'};

        async.series([
            api.create.bind(null, firstData),
            api.create.bind(null, secondData),
            getOne
        ], cb);

        function getOne(cb) {
            sugar.getOne(models.Author, firstData, function(err, d) {
                assert.equal(d.name, firstData.name);

                cb(err, d);
            });
        }
    };
};
