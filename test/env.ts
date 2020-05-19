// @ts-ignore
import jsdom = require("jsdom-global")
let test = jsdom(
    ``,
    {
        url: "http://localhost:8338/"
    }
);
