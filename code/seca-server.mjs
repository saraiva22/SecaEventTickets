import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

import cors from "cors";
import express from "express";
import url from "url";
import path from "path";
import hbs from "hbs";
import morgan from "morgan";
import passport from "passport";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// DATA MEM IMPORTS
import * as secaTmData from "./data/tm-events-data.mjs";
//import * as secaGroupsData from "./data/local/seca-groups-data-mem.mjs";
//import * as secaUsersData from "./data/local/seca-users-data-mem.mjs";

// DATA ELASTICSEARCH IMPORTS
import * as secaGroupsElastic from "./data/elastic/seca-groups-data-elastic.mjs";
import * as secaUsersElastic from "./data/elastic/seca-users-data-elastic.mjs";

// SERVICE IMPORTS
import eventsServiceInit from "./services/seca-events-services.mjs";
import usersServiceInit from "./services/seca-users-services.mjs";
import groupsServiceInit from "./services/seca-groups-services.mjs";

// WEB API IMPORTS
import eventsApiInit from "./web/api/seca-events-web-api.mjs";
import usersApiInit from "./web/api/seca-users-web-api.mjs";
import groupsApiInit from "./web/api/seca-groups-web-api.mjs";

// WEB SITE IMPORTS
import * as staticWebSite from "./web/site/seca-static-web-site.mjs";
import eventsSiteInit from "./web/site/seca-events-web-site.mjs";
import groupsSiteInit from "./web/site/seca-groups-web-site.mjs";
import usersSiteInit from "./web/site/seca-users-web-site.mjs";

// Events - Service and Web Api
const secaEventsServices = eventsServiceInit(secaTmData);
const eventsWebApi = eventsApiInit(secaEventsServices);
const eventsWebSite = eventsSiteInit(secaEventsServices);

// Users - Service and Web Api
const secaUsersServices = usersServiceInit(secaUsersElastic);
const usersWebApi = usersApiInit(secaUsersServices);
const usersWebSite = usersSiteInit(secaUsersServices);

// Groups - Service and Web Api
const secaGroupsServices = groupsServiceInit(
  secaEventsServices,
  secaGroupsElastic,
  secaUsersElastic
);
const groupsWebApi = groupsApiInit(secaGroupsServices);
const groupsWebSite = groupsSiteInit(secaGroupsServices, secaUsersServices);

const PORT = 8080;
const swaggerDocument = yaml.load("./docs/events-api.yaml");

console.log("Setting up server");
let app = express();

app.use(
  expressSession({
    secret: "Client Secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/site", express.static("./web/site/public"));

// Passport initialization
app.use(passport.session());
app.use(passport.initialize());

passport.serializeUser(serializeUserDeserializeUser);
passport.deserializeUser(serializeUserDeserializeUser);

app.use("/site/groups", usersWebSite.verifyAuthenticated);

// Handlebars view engine setup
const currentFileDir = url.fileURLToPath(new URL(".", import.meta.url));
const viewsDir = path.join(currentFileDir, "web", "site", "resources", "views");
app.set("view engine", "hbs");
app.set("views", viewsDir);

hbs.registerPartials(path.join(viewsDir, "partials"));

hbs.handlebars.registerHelper("checkBlank", function (field, value, options) {
  if (value === "" || value === undefined || value === null) {
    return `<script>alert(${field} is blank);</script>`;
  } else {
    return options.inverse(this);
  }
});

// Public resources setup
const publicFilesDir = `${currentFileDir}/web/site/resources/public`;
app.use("/site", express.static(publicFilesDir));

// Web site routes
app.get("/site/home", staticWebSite.getHome);

// URIs for events
app.get("/site/events/popular", eventsWebSite.getPopularEvents);
app.get("/site/events", eventsWebSite.getSearchedEvents);
app.get("/site/events/:eventId", eventsWebSite.getEventDetails);

// URIs for groups
app.get("/site/groups", groupsWebSite.getAllGroups);
app.post("/site/groups", groupsWebSite.createGroup);
app.get("/site/groups/:groupId", groupsWebSite.getGroupsDetails);
app.post("/site/groups/:groupId/delete", groupsWebSite.deleteGroup);
app.get("/site/groups/:groupId/update", groupsWebSite.updateGroupPage);
app.post("/site/groups/:groupId/update", groupsWebSite.updateGroup);
app.post("/site/groups/:groupId/events", groupsWebSite.addEventToGroup);
app.post(
  "/site/groups/:groupId/events/:eventsId",
  groupsWebSite.deleteEventFromGroup
);

// URIs for users
app.get("/site/login", usersWebSite.userForm);
app.post("/site/login", usersWebSite.validateLogin);
app.get("/site/signup", usersWebSite.userForm);
app.post("/site/signup", usersWebSite.createUser);
app.post("/site/logout", usersWebSite.logout);

// Web Api routes
// Get Popular Events
app.get("/events/popular", eventsWebApi.getPopularEvents);

// Get Search Events according to keyword
app.get("/events", eventsWebApi.getSearchedEvents);

// Get Event Details
app.get("/events/:eventId", eventsWebApi.getEventDetails);

// Create User
app.post("/users", usersWebApi.createUser);

// Get All Groups of User
app.get("/groups", groupsWebApi.getAllGroups);

// Create New Group
app.post("/groups", groupsWebApi.createGroup);

// Get Group Details
app.get("/groups/:groupId", groupsWebApi.getGroupsDetails);

// Update Name and Group Description
app.put("/groups/:groupId", groupsWebApi.updateGroup);

// Delete a Group
app.delete("/groups/:groupId", groupsWebApi.deleteGroup);

// Add Event to One Group
app.post("/groups/:groupId/events", groupsWebApi.addEventToGroup);

// Delete an Event From Group
app.delete(
  "/groups/:groupId/events/:eventsId",
  groupsWebApi.deleteEventFromGroup
);

app.listen(PORT, () =>
  console.log(`Server listening in http://localhost:${PORT}`)
);

function serializeUserDeserializeUser(user, done) {
  done(null, user);
}

console.log("End setting up server");
