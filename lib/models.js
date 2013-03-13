function init(sugar, engine) {
    var schema = sugar.schema(engine);
    var ref = sugar.ref;
    var refs = sugar.refs;
    var unique = sugar.unique;
    var mixed = sugar.mixed;
    var schemas = {};

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
