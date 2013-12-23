var funkit = require('funkit');
var equals = funkit.ops.equals;


module.exports = function(sugar, schemas, assert) {
    return function createAuthor(data, cb) {
        var now = new Date().getTime();
        var name, extra;

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

        sugar.create(schemas.Author, data, function(err, d) {
            assert.ok(d.created.getTime() - now < 1000);
            assert.equal(d.name, name);
            assert.ok(equals(d.extra, extra));

            cb(err, d);
        });
    };
};
