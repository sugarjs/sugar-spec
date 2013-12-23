module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, author) {
            sugar.get(schemas.Author, author._id, ['name'], function(err, d) {
                assert.equal(d.name, author.name);
                assert.equal(d._id, author._id.toString()); // XXX: toString needed

                cb(err, d);
            });
        });
    };
};
