module.exports = function(sugar, models, assert, api) {
    return function(cb) {
        api.create(null, cb);
    };
};
