var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        var origName = 'foo';

        sugar.create(schemas.Author, {name: origName}, function(err) {
            if(err) {
                return cb(err);
            }

            sugar.create(schemas.Author, {name: 'bar'}, function(err, author) {
                if(err) {
                    return cb(err);
                }

                sugar.update(schemas.Author, author._id, {
                    name: origName
                }, function(err) {
                    assert(is.defined(err));

                    cb();
                });
            });
       });
    };
};
