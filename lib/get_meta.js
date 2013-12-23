var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        sugar.getMeta(schemas.Author, function(err, meta) {
            assert.ok(is.object(meta));

            assert.deepEqual(meta, [{
                name: 'name',
                type: 'String',
                required: true
            },
            {
                name: 'nick',
                type: 'String'
            },
            {
                name: 'extra',
                type: 'Mixed'
            },
            {
                name: 'created',
                type: 'Date'
            }]);

            cb(err, meta);
        });
    };
};

