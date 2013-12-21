module.exports = function(sugar, models, assert) {
    return function getOrCreateAuthor(cb) {
        var name = 'Joe';

        sugar.getOrCreate(models.Author, {name: name}, function(err, author) {
            assert.equal(author && author.name, name);

            sugar.getOrCreate(models.Author, {name: name}, function(err, d) {
                assert.equal(author && author._id, d && d._id.toString()); // XXX: toString needed
                assert.equal(d && d.name, name);

                cb(err, d);
            });
        });
    };
};
