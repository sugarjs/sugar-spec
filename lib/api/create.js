var funkit = require('funkit');
var equals = funkit.ops.equals;


module.exports = function(sugar, models, assert) {
    return function createAuthor(data, cb) {
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

        sugar.create(models.Author, data, function(err, d) {
            assert.equal(d.name, name);
            assert.ok(equals(d.extra, extra));

            cb(err, d);
        });
    };
};
