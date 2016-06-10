(function(window) {
    "use strict";

    /**
     * Executes functions in async mode.
     * @param  {Function|object} fn Function to be executed or an array of
     * functions that will be executed.
     * @param  {Boolean}  wait If true, when fn is an array of functions, the
     * callbacks will be executed orderly, waiting one another. The order of
     * execution is determined by the position of the function in the array.
     */
    window.async = function(fn, wait) {
        if (typeof fn === 'function') {
            window.setTimeout(fn, 0);
        } else if (typeof fn === 'object') {
            if (fn.length > 0) {
                if (wait === true) {
                    var first = fn.shift();

                    window.setTimeout(function() {
                        if (typeof first === 'function') {
                            first();
                        }
                        async(fn, true);
                    }, 0);
                } else {
                    for (var i in fn) {
                        if (typeof fn[i] === 'function') {
                            window.setTimeout(fn[i], 0);
                        }
                    }
                }
            }
        } else {
            throw 'fn must be a function or an array of functions';
        }
    };
})(window);
