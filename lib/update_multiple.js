module.exports = function(sugar, models, assert) {
    return function updateMultipleAuthors(cb) {
        var firstAuthor = {name: 'foo'};
        var secondAuthor = {name: 'bar'};
        var authors = [firstAuthor, secondAuthor];

        sugar.create(models.Author, authors, function(err, d) {
            if(err) return cb(err);

            var name = 'joe';

            sugar.update(models.Author, [d && d[0]._id, d && d[1]._id], {name: name}, function(err, d) {
                if(err) return cb(err);

                assert.equal(d && d[0].name, name);
                assert.equal(d && d[1].name, name);

                cb();
            });
        });
    };
};
