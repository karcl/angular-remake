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
        listenerFn: listenerFn,
        last: initWatchVal // Initialize with reference value
    };
    this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function () {
    var self = this;
    var newValue;
    var oldValue;

    _.forEach(this.$$watchers, function (watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (newValue !== oldValue) {
            watcher.last = newValue;
            watcher.listenerFn(newValue,
                    (oldValue === initWatchVal ? newValue : oldValue),
                    self);
        }
    });

};
