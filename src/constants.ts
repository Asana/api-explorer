class BaseConstants {
  public static LOCALSTORAGE_KEY: string;
  public static CLIENT_ID: string;
  public static REDIRECT_URI: string;
}

class GhPagesConstants implements BaseConstants {
  public static LOCALSTORAGE_KEY = "api_tester_credentials";
  public static CLIENT_ID = "29147353239426";
  public static REDIRECT_URI =
    "https://asana.github.io/node-asana-tester/popup_receiver.html";
}

class LocalhostConstants implements BaseConstants {
  public static LOCALSTORAGE_KEY = "api_tester_credentials";
  public static CLIENT_ID = "23824292948206";
  public static REDIRECT_URI = "http://localhost:8338/popup_receiver.html";
}

var constants = process.env.USE_GH_PAGES ?
  GhPagesConstants : LocalhostConstants;
export = constants;
