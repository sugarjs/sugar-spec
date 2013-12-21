module.exports = function(sugar, models, assert, api) {
    return function(cb) {
        api.create(null, function(err, d) {
            // XXX: toString
            sugar.remove(models.Author, d._id.toString(), function(err, d) {
                assert.ok(d.deleted);

                sugar.count(models.Author, function(err, d) {
                    assert.equal(d, 0);

                    cb(err, d);
                });
            });
        });
    };
};
