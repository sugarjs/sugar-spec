var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        sugar.create(schemas.Author, {}, function(err) {
            assert(is.defined(err));

            cb();
        });
    };
};
