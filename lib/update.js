module.exports = function(sugar, models, assert, api) {
    return function updateAuthor(cb) {
        api.create(null, function(err, d) {
            var name = d && d.name + d.name;

            if(d) d.name = name;

            sugar.update(models.Author, d && d._id, d, function(err, d) {
                assert.equal(d && d.name, name);

                cb(err, d);
            });
        });
    };
};
