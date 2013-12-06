module.exports = function(sugar, models, assert, api) {
    return function removeAuthorByName(cb) {
        var name = 'Joe';

        api.create({name: name}, function(err, d) {
            sugar.remove(models.Author, {name: name}, function(err, d) {
                assert.ok(d && d[0].deleted);

                sugar.count(models.Author, function(err, d) {
                    assert.equal(d, 0);

                    cb(err, d);
                });
            });
        });
    };
};
