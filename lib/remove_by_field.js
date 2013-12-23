module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        var name = 'Joe';

        api.create({name: name}, function(err) {
            if(err) {
                return cb(err);
            }

            sugar.remove(schemas.Author, {name: name}, function(err, d) {
                if(err) {
                    return cb(err);
                }

                assert.ok(d[0].deleted);

                sugar.count(schemas.Author, function(err, d) {
                    assert.equal(d, 0);

                    cb(err, d);
                });
            });
        });
    };
};
