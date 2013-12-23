var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        sugar.create(schemas.Author, {name: 'foo'}, function(err, author) {
            if(err) {
                return cb(err);
            }

            sugar.update(schemas.Author, author._id, {
                bonus: 'something'
            }, function(err, author) {
                if(err) {
                    return cb(err);
                }

                assert(!is.defined(author.bonus));

                cb();
            });
       });
    };
};
