// @ts-ignore
import jsdom = require("jsdom-global")
let test = jsdom(
    undefined,
    {
        url: "http://localhost:8338/"
    }
);
