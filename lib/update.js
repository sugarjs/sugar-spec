module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, d) {
            var name = d.name + d.name;

            d.name = name;

            sugar.update(schemas.Author, d._id, d, function(err, d) {
                assert.equal(d.name, name);

                sugar.count(schemas.Author, function(err, count) {
                    assert.equal(count, 1);

                    sugar.getOne(schemas.Author, d._id, function(err, author) {
                        assert.deepEqual(d, author);

                        cb(err, d);
                    });
                });
            });
        });
    };
};
