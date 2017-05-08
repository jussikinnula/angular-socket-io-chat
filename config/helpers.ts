const path = require('path');

// Helpers
export function includeClientPackages(packages, localModule?: string[]) {
    return function(context, request, cb) {
        if (localModule instanceof RegExp && localModule.test(request)) {
            return cb();
        }
        if (packages instanceof RegExp && packages.test(request)) {
            return cb();
        }
        if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
            return cb();
        }
        if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
            return cb(null, 'commonjs ' + request);
        }
        return cb();
    };
}

export function root(args) {
    var basePath = path.join(__dirname, '..');
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [basePath].concat(args));
}
