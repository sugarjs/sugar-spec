var is = require('annois');


module.exports = function(sugar, models, assert) {
    return function(cb) {
        var origAuthor = {
            name: 'foo',
            bonus: 'something'
        };

        sugar.create(models.Author, origAuthor, function(err, author) {
            if(err) {
                return cb(err);
            }

            assert(!is.defined(author.bonus));
            assert.equal(author.name, origAuthor.name);

            cb();
        });
    };
};
