module.exports = function(sugar, models, assert, api) {
    return function get(cb) {
        api.create(null, function(err, author) {
            sugar.get(models.Author, author._id, function(err, d) {
                // XXX: figure out why d._id.toString() is needed (different encoding?)
                //assert.ok(equals(author, d));
                assert.equal(author._id, d._id.toString());

                cb(err, d);
            });
        });
    };
};
