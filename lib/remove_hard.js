module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, d) {
            // XXX: toString
            sugar.remove(schemas.Author, d._id.toString(), {
                hard: true
            }, function(err, d) {
                assert.ok(!d);

                sugar.count(schemas.Author, function(err, d) {
                    assert.equal(d, 0);

                    cb(err, d);
                });
            });
        });
    };
};
