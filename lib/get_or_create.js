module.exports = function(sugar, models, assert) {
    return function getOrCreate(cb) {
        var name = 'Joe';

        sugar.getOrCreate(models.Author, {name: name}, function(err, author) {
            assert.equal(author.name, name);

            sugar.getOrCreate(models.Author, {name: name}, function(err, d) {
                assert.equal(author._id, d._id.toString()); // XXX: toString needed
                assert.equal(d.name, name);

                cb(err, d);
            });
        });
    };
};
