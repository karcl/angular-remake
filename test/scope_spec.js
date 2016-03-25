/* jshint globalstrict: true */
/* global Scope: false */
'use strict';

describe('Scope', function () {

    it('can be constructed and used as object', function () {
        var scope = new Scope();
        scope.aProperty = 1;
        expect(scope.aProperty).toBe(1);
    });

    describe('digest', function () {

        var scope;

        beforeEach(function () {
            scope = new Scope();
        });

        it('calls listener function of a watch on first $digest', function () {
            var watchFn = function () { return '0x29a'; };
            var listenerFn = jasmine.createSpy();

            scope.$watch(watchFn, listenerFn);

            scope.$digest();

            expect(listenerFn).toHaveBeenCalled();
        });

        it('calls the watch function with the scope as the argument', function () {
            var watchFn = jasmine.createSpy();
            var listenerFn = function () {};
            scope.$watch(watchFn, listenerFn);

            scope.$digest();

            expect(watchFn).toHaveBeenCalledWith(scope);
        });

        it('calls the listener function when the watch value changes', function () {
            scope.someValue = 'x';
            scope.counter = 0;

            scope.$watch(
                    function (scope) { return scope.someValue; },
                    function (newValue, oldValue, scope) { scope.counter++; }
            );

            expect(scope.counter).toBe(0);

            scope.$digest();
            expect(scope.counter).toBe(1);

            scope.$digest();
            expect(scope.counter).toBe(1);

            scope.someValue = 'y';
            expect(scope.counter).toBe(1);

            scope.$digest();
            expect(scope.counter).toBe(2);
        });
    });

});

