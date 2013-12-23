module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, function(err, d) {
            var name = d.name + d.name;

            d.name = name;

            sugar.update(schemas.Author, d._id, d, function(err, d) {
                assert.equal(d.name, name);

                cb(err, d);
            });
        });
    };
};
