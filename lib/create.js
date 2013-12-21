module.exports = function(sugar, models, assert, api) {
    return function create(cb) {
        api.create(null, cb);
    };
};
