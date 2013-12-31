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
                        // depending on implementation author might be missing
                        // fields that evaluate as false
                        assert.equal(d._id, author._id.toString()); // XXX
                        assert.deepEqual(d.extra, author.extra);
                        assert.equal(d.name, author.name);
                        assert.equal(d.created, author.created.toString()); // XXX

                        cb(err, d);
                    });
                });
            });
        });
    };
};
