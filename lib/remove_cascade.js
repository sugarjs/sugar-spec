module.exports = function(sugar, models, assert, api) {
    // TODO: tidy up (use bind etc.)
    return function removeCascade(cb) {
        api.create(null, function(err, author) {
            createLibrary({
                name: 'demo',
                author: author
            })(function(err, library) {
                createLibraryAuthor({
                    library: library,
                    author: author
                })(function(err, d) {
                    sugar.remove(models.Library, library && library._id, function(err, d) {
                        sugar.count(models.LibraryAuthor, function(err, d) {
                            assert.equal(d, 0);

                            cb();
                        });
                    });
                });
            });
        });
    };

    function createLibrary(data) {
        return function(cb) {
            sugar.create(models.Library, data, cb);
        };
    }

    function createLibraryAuthor(data) {
        return function(cb) {
            sugar.create(models.LibraryAuthor, data, cb);
        };
    }
};
