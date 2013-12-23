module.exports = function(sugar, schemas, assert, api) {
    // TODO: tidy up (use bind etc.)
    return function(cb) {
        api.create(null, function(err, author) {
            createLibrary({
                name: 'demo',
                author: author
            })(function(err, library) {
                createLibraryAuthor({
                    library: library,
                    author: author
                })(function(err) {
                    if(err) {
                        return cb(err);
                    }

                    sugar.remove(schemas.Library, library._id, function(err) {
                        if(err) {
                            return cb(err);
                        }

                        sugar.count(schemas.LibraryAuthor, function(err, d) {
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
            sugar.create(schemas.Library, data, cb);
        };
    }

    function createLibraryAuthor(data) {
        return function(cb) {
            sugar.create(schemas.LibraryAuthor, data, cb);
        };
    }
};
