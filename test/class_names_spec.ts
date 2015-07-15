import chai = require("chai");
import cx = require("../src/class_names");

var assert = chai.assert;

suite("classNames", () => {

    test("should filter to return only truthy strings", () => {
        assert.equal(cx({
            foo: true,
            bar: undefined,
            baz: true,
            fire: null,
            foobar: false
        }), "foo baz");
    });

    test("should append extra class strings", () => {
        assert.equal(cx({
            baz: false,
            boo: true,
            bar: true
        }, "a", "b", "c"), "boo bar a b c");
    });

    test("should also accept a string as the first argument", () => {
        assert.equal(cx("foobar", "foo", "baz"), "foobar foo baz");
    });

    test("should filter out falsy values", () => {
        assert.equal(cx(null, "foo", undefined, "bar"), "foo bar");
    });
});
