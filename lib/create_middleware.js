module.exports = function(sugar, models, assert) {
    return function(cb) {
        return cb();

        // TODO
        async.series([
            sugar.create.bind(undefined, models.Middleware, {}),
            sugar.create.bind(undefined, models.Middleware, {}),
            function(cb) {
                sugar.getAll(models.Middleware, function(err, d) {
                    d = d[0];

                    assert.ok(d.pre);
                    assert.ok(d.post);

                    cb(err);
                });
            }
        ], cb);
    };
};
