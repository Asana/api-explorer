/**
 * A utility to concatenate multiple classNames into a single string.
 * The first parameter may also be a "classSet", an object with classNames
 * as keys mapping to boolean values indicating whether or not the given
 * className should be included.
 * @param  {(ClassSet | string)} arg - classSet or first className
 * @param  {...string} className - extra className to append
 * @return {string} the complete concatenated className
 */
function classNames(
    arg: ({ [key: string]: boolean } | string),
    ...extraClasses: string[]
): string {

    var className = "";
    if (typeof arg === "object") {
        for (var name in arg) {
            if (arg.hasOwnProperty(name) && arg[name]) {
                className += " " + name;
            }
        }
    } else if (arg) {
        className = " " + arg;
    }

    var i: number;
    for (i = 0; i < extraClasses.length; ++i) {
        if (extraClasses[i]) {
            className += " " + extraClasses[i];
        }
    }
    return className.substr(1);
}

export = classNames;
