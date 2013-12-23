var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        var license = {name: 'MIT'};

        sugar.create(schemas.License, license, function() {
            sugar.create(schemas.License, license, function(err) {
                assert(is.defined(err));

                cb();
            });
        });
    };
};
