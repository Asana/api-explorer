import resourceBase = require("./gen/status_updates_base");
resourceBase.comment = "A _status update_ is an update on the progress of a particular object, and is sent out to all followers when created. These updates include both text describing the update and a status_type intended to represent the overall state of the project. These include: on_track for projects that are on track, at_risk for projects at risk, off_track for projects that are behind, and on_hold for projects on hold.\n\nStatus updates can be created and deleted, but not modified.\n";
export = resourceBase;
