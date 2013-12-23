var is = require('annois');


module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, d) {
            var name = d.name + d.name;

            d.name = name;
            d.bonus = 'foobar';

            sugar.update(schemas.Author, d._id, d, function(err, d) {
                assert(!is.defined(d.bonus));
                assert.equal(d.name, name);

                cb(err, d);
            });
        });
    };
};
