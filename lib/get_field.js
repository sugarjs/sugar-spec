module.exports = function(sugar, models, assert, api) {
    return function getAuthorName(cb) {
        api.create(null, function(err, author) {
            sugar.get(models.Author, author && author._id, ['name'], function(err, d) {
                assert.equal(d && d.name, author && author.name);
                assert.equal(d && d._id, author && author._id.toString()); // XXX: toString needed

                cb(err, d);
            });
        });
    };
};
