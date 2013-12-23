var is = require('annois');


module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        sugar.getMeta(schemas.Author, function(err, meta) {
            assert.ok(is.object(meta));

            assert.deepEqual(meta, {
                name: {
                    type: 'String',
                    required: true
                },
                nick: {
                    type: 'String'
                },
                extra: {
                    type: 'Mixed'
                },
                created: {
                    type: 'Date'
                }
            });

            cb(err, meta);
        });
    };
};

