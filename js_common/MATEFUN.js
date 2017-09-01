if (typeof MATEFUN === "undefined") {var MATEFUN = {};}

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/**
Utility method for safely creating namespaces if they don't already exist.

A namespace will be created on the MATEFUN global object:

    // Create `MATEFUN.your.namespace.here` as nested objects, preserving any
    // objects that already exist instead of overwriting them.
    MATEFUN.namespace('your.namespace.here');

Dots in the input string cause `namespace` to create nested objects for each
token. If any part of the requested namespace already exists, the current
object will be left in place and will not be overwritten. This allows
multiple calls to `namespace` to preserve existing namespaced properties.

Be careful with namespace tokens. Reserved words may work in some browsers
and not others. For instance, the following will fail in some browsers
because the supported version of JavaScript reserves the word "long":

    MATEFUN.namespace('really.long.nested.namespace');

Note: If you pass multiple arguments to create multiple namespaces, only the
last one created is returned from this function.

@method namespace
@param {String} namespace* One or more namespaces to create.
@return {Object} Reference to the last namespace object created.
**/
if (typeof MATEFUN.namespace === 'undefined') {
    MATEFUN.namespace = function() {
        var a = arguments,
            o,
            i, 
            j, 
            d, 
            arg;

        for (i = 0; i < a.length; i += 1) {
            o = this; //Reset base object per argument or it will get reused from the last
            arg = a[i];
            if (arg.indexOf(".") > -1) { //Skip this if no "." is present
                d = arg.split(".");
                for (j = 0; j < d.length; j += 1) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]];
                }
            } else {
                o[arg] = o[arg] || {};
                o = o[arg]; //Reset base object to the new object so it's returned
            }
        }
        return o;
    };
}