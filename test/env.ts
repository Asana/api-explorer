import jsdom = require("jsdom");

// Add (<any>global) document
(<any>global).document = jsdom.jsdom(null);
(<any>global).document.getSelection = function(): any {
    return null;
};
(<any>global).window = (<any>global).document.parentWindow;
(<any>global).navigator = (<any>global).window.navigator;
