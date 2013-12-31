function init(sugar, engine) {
    var schema = sugar.schema(engine);
    var ref = sugar.ref;
    var refs = sugar.refs;
    var unique = sugar.unique;
    var mixed = sugar.mixed;
    var schemas = {};

    schema(schemas, 'Middleware').fields({
        pre: Boolean,
        post: Boolean
    });

    // TODO: figure out a nice spec for middleware and implement tests
    /*
    Middleware.pre(function() {
        Middleware.use(function(next) {
            sugar.getAll(Middleware, {}, function(err, d) {
                if(err) console.error(err);

                console.log('setting pre true', d);

                // TODO: set pre of each true. now setting just first
                // TODO: implement batch update?

                if(d[0]) sugar.update(Middleware, d[0]._id, {pre: true}, next);
                else next();
            });
        });
    });
    Middleware.post(function() {
        Middleware.use(function(next, data) {
            console.log('setting post true', data);

            sugar.update(Middleware, data._id, {
                post: true
            }, function(err) {
                if(err) console.error(err);

                next();
            });
        });
    });*/

    schema(schemas, 'Author').fields({
        name: {type: String, required: true},
        nick: {type: String, unique: true},
        extra: mixed()
    });

    schema(schemas, 'License').fields({
        name: {type: String, unique: true}
    });

    schema(schemas, 'Library').fields({
        author: ref('Author', {required: true}),
        name: {type: String, required: true},
        licenses: refs('License')
    });

    // this a bit contrived example illustrates how to use
    // schemas as sort of templates. this schema is needed
    // for testing delete cascade as well
    schema(schemas, 'LibraryAuthor').fields({
        library: ref('Library', {required: true}),
        author: ref('Author', {required: true}),
        role: String
    });

    return schemas;
}
module.exports = init;
