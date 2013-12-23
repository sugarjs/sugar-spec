var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        sugar.getMeta(schemas.Author, function(err, d) {
            assert.ok(is.object(d));

            cb(err, d);
        });
    };
};
