module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, author) {
            sugar.get(schemas.Author, author._id, function(err, d) {
                // XXX: figure out why d._id.toString() is needed (different encoding?)
                //assert.ok(equals(author, d));
                assert.equal(author._id, d._id.toString());

                cb(err, d);
            });
        });
    };
};
