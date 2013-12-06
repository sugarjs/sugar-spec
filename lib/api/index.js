module.exports = function(sugar, models, assert) {
    var api = require('require-dir')('.');
    var ret = {};

    Object.keys(api).forEach(function(name) {
        ret[name] = api[name](sugar, models, assert);
    });

    return ret;
};
