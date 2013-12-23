var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        var firstAuthor = {name: 'foo'};
        var secondAuthor = {name: 'bar'};

        sugar.create(schemas.Author, [firstAuthor, secondAuthor], function(err, authors) {
            if(err) {
                return cb(err);
            }

            assert(is.array(authors));
            assert.equal(authors[0].name, firstAuthor.name);
            assert.equal(authors[1].name, secondAuthor.name);

            cb();
        });
    };
};
