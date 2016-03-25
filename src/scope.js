/* jshint globalstrict: true */
'use strict';

// Function is a reference value - it is not equal to anything
// but itself
function initWatchVal() {}

function Scope() {
    this.$$watchers = [];
}

Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || (function () { }),
        last: initWatchVal // Initialize with reference value
    };
    this.$$watchers.push(watcher);
};

Scope.prototype.$$digestOnce = function () {
    var self = this;
    var newValue;
    var oldValue;
    var dirty;

    _.forEach(this.$$watchers, function (watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (newValue !== oldValue) {
            watcher.last = newValue;
            watcher.listenerFn(newValue,
                    (oldValue === initWatchVal ? newValue : oldValue),
                    self);
            dirty = true;
        }
    });

    return dirty;
};

Scope.prototype.$digest = function () {
    var ttl = 10;
    var dirty;
    do {
        dirty = this.$$digestOnce();
        if (dirty && !(ttl--)) {
            throw '10 digest iterations reached';
        }
    } while (dirty);
};
