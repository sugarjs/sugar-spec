module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        sugar.count(schemas.Author, function(err, d) {
            assert.equal(d, 0);

            api.create(null, function(err, d) {
                sugar.count(schemas.Author, function(err, d) {
                    assert.equal(d, 1);

                    cb(err, d);
                });
            });
        });
    };
};
