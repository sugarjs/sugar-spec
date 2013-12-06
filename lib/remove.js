module.exports = function(sugar, models, assert, api) {
    return function removeAuthor(cb) {
        api.create(null, function(err, d) {
            // XXX: toString
            sugar.remove(models.Author, d && d._id.toString(), function(err, d) {
                assert.ok(d && d.deleted);

                sugar.count(models.Author, function(err, d) {
                    assert.equal(d, 0);

                    cb(err, d);
                });
            });
        });
    };
};
