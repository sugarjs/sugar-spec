module.exports = function(sugar, schemas, assert, api) {
    return function(cb) {
        api.create(null, cb);
    };
};
