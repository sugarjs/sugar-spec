var is = require('is-js');


module.exports = function(sugar, models, assert) {
    return function createMultipleAuthors(cb) {
        var firstAuthor = {name: 'foo'};
        var secondAuthor = {name: 'bar'};

        sugar.create(models.Author, [firstAuthor, secondAuthor], function(err, authors) {
            if(err) return cb(err);

            assert(is.array(authors));
            assert.equal(authors && authors[0].name, firstAuthor.name);
            assert.equal(authors && authors[1].name, secondAuthor.name);

            cb();
        });
    };
};
