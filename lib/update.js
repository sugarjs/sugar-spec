module.exports = function(sugar, models, assert, api) {
    return function(cb) {
        api.create(null, function(err, d) {
            var name = d.name + d.name;

            if(d) {
                d.name = name;
            }

            sugar.update(models.Author, d._id, d, function(err, d) {
                assert.equal(d.name, name);

                cb(err, d);
            });
        });
    };
};
