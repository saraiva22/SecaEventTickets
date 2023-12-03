import cors from "cors";
import express from "express";

// DATA IMPORTS
import * as secaTmData from "./data/tm-events-data.mjs";
import * as secaGroupsData from "./data/local/seca-groups-data-mem.mjs";
import * as secaUsersData from "./data/local/seca-users-data-mem.mjs";
// SERVICE IMPORTS
import eventsService from "./services/seca-events-services.mjs";
import usersService from "./services/seca-users-services.mjs";
import groupsService from "./services/seca-groups-services.mjs";
// WEB API IMPORTS
import eventsApi from "./web/api/seca-events-web-api.mjs";
import usersApi from "./web/api/seca-users-web-api.mjs";
import groupsApi from "./web/api/seca-groups-web-api.mjs";
// SITE IMPORTS
import * as staticWebSite from "./web/site/static-web-site.mjs";

// Events - Service and Web Api
const secaEventsServices = eventsService(secaTmData);
const eventsWebApi = eventsApi(secaEventsServices);

// Groups - Service and Web Api
const secaGroupsServices = groupsService(
  secaEventsServices,
  secaGroupsData,
  secaUsersData
);
const groupsWebApi = groupsApi(secaGroupsServices);

// Users - Service and Web Api
const secaUsersServices = usersService(secaUsersData);
const usersWebApi = usersApi(secaUsersServices);

// Web Site Imports

const PORT = 8080;

console.log("Setting up server");
let app = express();

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use("/site", express.static("./web/site/public"));

// Web site routes
app.get("/site/home", staticWebSite.getHome);

app.get("/events/popular", eventsWebApi.getPopularEvents);

app.get("/events", eventsWebApi.getSearchedEvents);

app.post("/users", usersWebApi.createUser);

app.get("/groups", groupsWebApi.getAllGroups);

app.post("/groups", groupsWebApi.createGroup);

app.get("/groups/:groupId", groupsWebApi.getGroupsDetails);

app.put("/groups/:groupId", groupsWebApi.updateGroup);

app.delete("/groups/:groupId", groupsWebApi.deleteGroup);

app.post("/groups/:groupId/events", groupsWebApi.addEventToGroup);

app.delete(
  "/groups/:groupId/events/:eventsId",
  groupsWebApi.deleteEventFromGroup
);

app.listen(PORT, () =>
  console.log(`Server listening in http://localhost:${PORT}`)
);

console.log("End setting up server");
