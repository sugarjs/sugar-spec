module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        var engine = {
            name: 'demo',
            features: {
                neat: true
            }
        };

        sugar.create(schemas.Engine, engine, function(err, d) {
            sugar.get(schemas.Engine, d._id, function(err, d) {
                assert.equal(d.name, engine.name);
                assert.equal(d.features.neat, engine.features.neat);

                cb();
            });
        });
    };
};
