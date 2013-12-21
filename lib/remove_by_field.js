module.exports = function(sugar, models, assert, api) {
    return function removeByField(cb) {
        var name = 'Joe';

        api.create({name: name}, function(err) {
            if(err) {
                return cb(err);
            }

            sugar.remove(models.Author, {name: name}, function(err, d) {
                if(err) {
                    return cb(err);
                }

                assert.ok(d[0].deleted);

                sugar.count(models.Author, function(err, d) {
                    assert.equal(d, 0);

                    cb(err, d);
                });
            });
        });
    };
};
