module.exports = function(sugar, schemas, assert) {
    var api = require('require-dir')('.');
    var ret = {};

    Object.keys(api).forEach(function(name) {
        ret[name] = api[name](sugar, schemas, assert);
    });

    return ret;
};
