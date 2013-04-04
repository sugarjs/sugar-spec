function init(sugar, engine) {
    var schema = sugar.schema(engine);
    var ref = sugar.ref;
    var refs = sugar.refs;
    var unique = sugar.unique;
    var mixed = sugar.mixed;
    var schemas = {};

    var Middleware = schema('Middleware', {
        pre: Boolean,
        post: Boolean
    });
    Middleware.pre(function() {
        Middleware.use(function(next) {
            sugar.getAll(Middleware, {}, function(err, d) {
                if(err) console.error(err);

                // TODO: set pre of each true. now setting just first
                // TODO: implement batch update?

                if(d[0]) sugar.update(Middleware, d[0]._id, {pre: true}, next);
                else next();
            });
        });
    });
    Middleware.post(function() {
        Middleware.use(function(next, data) {
            sugar.update(Middleware, {
                _id: data._id,
                post: true
            }, function(err) {
                if(err) console.error(err);

                next();
            });
        });
    });
    schemas.Middleware = Middleware;

    schemas.Author = schema('Author', {
        name: {type: String, required: true},
        nick: String,
        extra: mixed()
    });

    schemas.License = schema('License', {
        name: {type: String, unique: true}
    });

    schemas.Library = schema('Library', {
        author: ref('Author', {required: true}),
        name: {type: String, required: true},
        licenses: refs('License')
    });

    // this a bit contrived example illustrates how to use
    // schemas as sort of templates. this schema is needed
    // for testing delete cascade as well
    // TODO: figure out how to eliminate that parent reference
    schemas.LibraryAuthor = schema('LibraryAuthor', {
        library: ref('Library', {required: true}, 'LibraryAuthor'),
        author: ref('Author', {required: true}, 'LibraryAuthor'),
        role: String
    });

    return schemas;
}
module.exports = init;
