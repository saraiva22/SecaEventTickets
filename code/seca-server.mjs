import cors from "cors";
import express from "express";

import * as secaTmData from './data/tm-events-data.mjs'
import * as secaData from "./data/local/seca-data-mem.mjs"
import * as secaUsersData from './data/local/seca-users-data-mem.mjs'
import eventsService from './web-api/seca-events-web-api.mjs'
import eventsApi from "./web-api/seca-events-web-api.mjs";
import usersService from './services/seca-users-services.mjs'
import usersApi from "./web-api/seca-users-web-api.mjs";
import groupsApi from "./web-api/seca-groups-web-api.mjs";
import groupsService from "./services/seca-groups-services.mjs"

const secaEventsServices = eventsService(secaTmData)
const eventsWebApi = eventsApi(secaEventsServices)

const secaGroupsServices = groupsService(secaData)   
const groupsWebApi = groupsApi(secaGroupsServices)     

const secaUsersServices = usersService(secaUsersData)
const usersWebApi = usersApi(secaUsersServices)

const PORT = 8080;

console.log("Setting up server");
let app = express();

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors());
app.use(express.json());

//app.get("/events", eventsApi.getSearchedEvents);

app.get("/events/popular", eventsWebApi.getPopularEvents);

app.post('/users', usersWebApi.createUser)

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
