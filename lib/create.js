module.exports = function(sugar, models, assert, api) {
    return function createAuthor(cb) {
        api.create(null, cb);
    };
};
