var assert = require('assert');

var async = require('async');
var funkit = require('funkit');
var equals = funkit.ops.equals;
var is = require('is-js');


var log = console.log.bind(console);
var models;
var sugar;

function spec(s, address, engine) {
    sugar = s;
    models = require('./models')(s, engine);

    log('Executing tests!');

    sugar.connect(address, function(err) {
        if(err) return console.error('Failed to connect to database!', err);

        executeTests(function() {
            log('Tests executed!');

            process.exit();
        });
    });
}

function executeTests(cb) {
    async.series(setup([
        createAuthor(),
        updateAuthor,
        removeAuthor,
        removeAuthorByName,
        removeCascade,
        getOrCreateAuthor,
        getAuthor,
        getAuthorName,
        getAllAuthors,
        getAllAuthorsLimit,
        getAllAuthorsOffset,
        getAllAuthorNames,
        getOneAuthor,
        getMeta
        //createMiddleware
    ], removeData
    ), cb);
}
module.exports = spec;

function removeData(t) {
    return function(cb) {
        async.series([
            removeAuthors,
            removeLibraries,
            removeLibraryAuthors
        ], t.bind(undefined, cb));
    };
}

function setup(tests, fn) {
    return tests.map(function(t) {
        return function(cb) {
            log('Executing', t.name);

            fn(t)(cb);
        };
    });
}

// TODO: figure out why bind doesn't work for these!
function removeAuthors(cb) {
    sugar.removeAll(models.Author, cb);
}

function removeLibraries(cb) {
    sugar.removeAll(models.Library, cb);
}

function removeLibraryAuthors(cb) {
    sugar.removeAll(models.LibraryAuthor, cb);
}

function getAuthorName(cb) {
    createAuthor()(function(err, author) {
        sugar.get(models.Author, author._id, ['name'], function(err, d) {
            assert.equal(d.name, author.name);
            assert.equal(d._id, author._id.toString()); // XXX: toString needed

            cb(err, d);
        });
    });
}

function getOrCreateAuthor(cb) {
    var name = 'Joe';

    sugar.getOrCreate(models.Author, {name: name}, function(err, author) {
        assert.equal(author.name, name);

        sugar.getOrCreate(models.Author, {name: name}, function(err, d) {
            assert.equal(author._id, d._id.toString()); // XXX: toString needed
            assert.equal(d.name, name);

            cb(err, d);
        });
    });
}

function getAuthor(cb) {
    createAuthor()(function(err, author) {
        sugar.get(models.Author, author._id, function(err, d) {
            // XXX: figure out why d._id.toString() is needed (different encoding?)
            //assert.ok(equals(author, d));
            assert.equal(author._id, d._id.toString());

            cb(err, d);
        });
    });
}

function getAllAuthors(cb) {
    // TODO: move into an array and generate createAuthors based on these
    var firstData = {name: 'Jack'};
    var secondData = {name: 'Joe'};

    async.series([
        createAuthor(firstData),
        createAuthor(secondData),
        getAll
    ], cb);

    function getAll(cb) {
        sugar.getAll(models.Author, function(err, d) {
            assert.equal(d.length, 2);

            // TODO: check just if the returned data contains (no need for order)
            assert.equal(d[0].name, firstData.name);
            assert.equal(d[1].name, secondData.name);

            cb(err, d);
        });
    }
}

// TODO: join with above somehow
function getOneAuthor(cb) {
    var firstData = {name: 'Jack'};
    var secondData = {name: 'Joe'};

    async.series([
        createAuthor(firstData),
        createAuthor(secondData),
        getOne
    ], cb);

    function getOne(cb) {
        sugar.getOne(models.Author, firstData, function(err, d) {
            assert.equal(d.name, firstData.name);

            cb(err, d);
        });
    }
}

// TODO: join with above somehow
function getAllAuthorNames(cb) {
    var firstData = {name: 'Jack', extra: ['foo', 'bar']};
    var secondData = {name: 'Joe', extra: ['boo', 'moo']};

    async.series([
        createAuthor(firstData),
        createAuthor(secondData),
        getAllArray,
        getAll
    ], cb);

    function getAllArray(cb) {
        sugar.getAll(models.Author, {fields: ['name']}, assertGetAll(cb));
    }

    function getAll(cb) {
        sugar.getAll(models.Author, {fields: 'name'}, assertGetAll(cb));
    }

    function assertGetAll(cb) {
        return function(err, d) {
            assert.equal(d.length, 2);

            // TODO: no need for these to be in order
            assert.equal(d[0].name, firstData.name);
            assert.equal(d[0].extra, undefined);
            assert.equal(d[1].name, secondData.name);
            assert.equal(d[1].extra, undefined);

            cb(err, d);
        };
    }
}

// TODO: join with above somehow
function getAllAuthorsLimit(cb) {
    var firstData = {name: 'Jack', extra: ['foo', 'bar']};
    var secondData = {name: 'Joe', extra: ['boo', 'moo']};

    async.series([
        createAuthor(firstData),
        createAuthor(secondData),
        getAll
    ], cb);

    function getAll(cb) {
        sugar.getAll(models.Author, {limit: 1}, function(err, d) {
            assert.equal(d.length, 1);

            // TODO: no need for these to be in order
            assert.equal(d[0].name, firstData.name);
            assert.ok(equals(d[0].extra, firstData.extra));

            cb(err, d);
        });
    }
}

// TODO: join with above somehow
function getAllAuthorsOffset(cb) {
    var firstData = {name: 'Jack', extra: ['foo', 'bar']};
    var secondData = {name: 'Joe', extra: ['boo', 'moo']};

    async.series([
        createAuthor(firstData),
        createAuthor(secondData),
        getAll
    ], cb);

    function getAll(cb) {
        sugar.getAll(models.Author, {limit: 1, offset: 1}, function(err, d) {
            assert.equal(d.length, 1);

            // TODO: no need for these to be in order
            assert.equal(d[0].name, secondData.name);
            assert.ok(equals(d[0].extra, secondData.extra));

            cb(err, d);
        });
    }
}

function updateAuthor(cb) {
    createAuthor()(function(err, d) {
        var name = d.name + d.name;

        d.name = name;

        sugar.update(models.Author, d._id, d, function(err, d) {
            assert.equal(d.name, name);

            cb(err, d);
        });
    });
}

function removeAuthor(cb) {
    createAuthor()(function(err, d) {
        // XXX: toString
        sugar.remove(models.Author, d._id.toString(), function(err, d) {
            assert.ok(d.deleted);

            sugar.count(models.Author, function(err, d) {
                assert.equal(d, 0);

                cb(err, d);
            });
        });
    });
}

function removeAuthorByName(cb) {
    var name = 'Joe';

    createAuthor({name: name})(function(err, d) {
        sugar.remove(models.Author, {name: name}, function(err, d) {
            assert.ok(d[0].deleted);

            sugar.count(models.Author, function(err, d) {
                assert.equal(d, 0);

                cb(err, d);
            });
        });
    });
}

function removeCascade(cb) {
    createAuthor()(function(err, author) {
        createLibrary({
            name: 'demo',
            author: author
        })(function(err, library) {
            createLibraryAuthor({
                library: library,
                author: author
            })(function(err, d) {
                sugar.remove(models.Library, library._id, function(err, d) {
                    sugar.count(models.LibraryAuthor, function(err, d) {
                        assert.equal(d, 0);

                        cb();
                    });
                });
            });
        });
    });
}

function createLibraryAuthor(data) {
    return function(cb) {
        sugar.create(models.LibraryAuthor, data, cb);
    };
}

function createLibrary(data) {
    return function(cb) {
        sugar.create(models.Library, data, cb);
    };
}

// XXX: using factory here since bind does not seem to work with async
function createAuthor(data) {
    var name, extra; // TODO: tidy up
    if(data) {
        name = data.name;
        extra = data.extra;
    }
    else {
        name = 'Joe';
        extra = ['foobar', 'barbar'];
        data = {
            name: name,
            extra: extra
        };
    }

    return function(cb) {
        sugar.create(models.Author, data, function(err, d) {
            assert.equal(d.name, name);
            assert.ok(equals(d.extra, extra));

            cb(err, d);
        });
    };
}

function createMiddleware(cb) {
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
}

function getMeta(cb) {
    sugar.getMeta(models.Author, function(err, d) {
        assert.ok(is.object(d));

        cb(err, d);
    });
}
