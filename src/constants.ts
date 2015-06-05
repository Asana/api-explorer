interface BaseConstants {
  LOCALSTORAGE_KEY: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  INITIAL_PAGINATION_LIMIT: number;
}

var ghPagesConstants: BaseConstants = {
  LOCALSTORAGE_KEY: "api_tester_credentials",
  CLIENT_ID: "29147353239426",
  REDIRECT_URI: "https://asana.github.io/node-asana-tester/popup_receiver.html",
  INITIAL_PAGINATION_LIMIT: 10
};

var localhostConstants: BaseConstants = {
  LOCALSTORAGE_KEY: "api_tester_credentials",
  CLIENT_ID: "23824292948206",
  REDIRECT_URI: "http://localhost:8338/popup_receiver.html",
  INITIAL_PAGINATION_LIMIT: 10
};

var constant: BaseConstants;
switch (process.env.CONSTANTS_TYPE) {
  case "gh_pages":
    constant = ghPagesConstants;
    break;

  case "localhost":
  default:
    constant = localhostConstants;
    break;
}

export = constant;
