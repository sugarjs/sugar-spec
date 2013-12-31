module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, author) {
            sugar.get(schemas.Author, author._id, ['name'], function(err, d) {
                assert.equal(d.name, author.name);
                assert(!d._id); // _id should be requested explicitly

                cb(err, d);
            });
        });
    };
};
