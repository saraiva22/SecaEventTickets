import cors from "cors";
import express from "express";

import * as secaData from "./data/local/seca-data-mem.mjs"
import * as eventsApi from "./web-api/seca-events-web-api.mjs";
import * as usersApi from "./web-api/seca-users-web-api.mjs";
import * as groupsApi from "./web-api/seca-groups-web-api.mjs";
import * as groupsService from "./services/seca-groups-services.mjs"

const secaDataServices = groupsService.default(secaData)    // function de services getAllGroups
const groupsWebApi = groupsApi.default(secaDataServices)       // function de web api 

const PORT = 8080;

console.log("Setting up server");
let app = express();

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors());
app.use(express.json());

//app.get("/events", eventsApi.getSearchedEvents);

app.get("/events/popular", eventsApi._getPopularEvents);

//app.post('/users', usersApi.addUser)

app.get('/groups', groupsWebApi.getAllGroups)

app.post("/groups", groupsWebApi.createGroup);

//app.get('/groups/:groupId', groupsApi.getGroup)

//app.put('/groups/:groupId', groupsApi.updateGroup)

app.delete('/groups/:groupId', groupsWebApi.deleteGroup)

//app.post('/groups/:groupId/events', groupsApi.addEventToGroup)

//app.delete('/groups/:groupId/events/:eventsId', groupsApi.deleteEventFromGroup)

app.listen(PORT, () =>
  console.log(`Server listening in http://localhost:${PORT}`)
);

console.log("End setting up server");
