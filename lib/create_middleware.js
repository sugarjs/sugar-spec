module.exports = function(sugar, schemas, assert) {
    return function(cb) {
        return cb();

        // TODO
        async.series([
            sugar.create.bind(undefined, schemas.Middleware, {}),
            sugar.create.bind(undefined, schemas.Middleware, {}),
            function(cb) {
                sugar.getAll(schemas.Middleware, function(err, d) {
                    d = d[0];

                    assert.ok(d.pre);
                    assert.ok(d.post);

                    cb(err);
                });
            }
        ], cb);
    };
};
