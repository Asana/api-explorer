/// <reference path="./asana.d.ts" />
import Asana = require("asana");

export function getAsanaClient(): Asana.Client {
    return Asana.Client.create();
}

