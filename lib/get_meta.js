var is = require('is-js');


module.exports = function(sugar, models, assert) {
    return function(cb) {
        sugar.getMeta(models.Author, function(err, d) {
            assert.ok(is.object(d));

            cb(err, d);
        });
    };
};
