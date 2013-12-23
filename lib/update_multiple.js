module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        var firstAuthor = {name: 'foo'};
        var secondAuthor = {name: 'bar'};
        var authors = [firstAuthor, secondAuthor];

        sugar.create(schemas.Author, authors, function(err, d) {
            if(err) {
                return cb(err);
            }

            var name = 'joe';

            sugar.update(schemas.Author, [d[0]._id, d[1]._id], {
                    name: name
                }, function(err, d) {
                if(err) {
                    return cb(err);
                }

                assert.equal(d[0].name, name);
                assert.equal(d[1].name, name);

                cb();
            });
        });
    };
};
