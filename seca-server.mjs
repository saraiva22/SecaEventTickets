import cors from "cors";
import express from "express";
import * as eventsApi from "./seca-events-web-api.mjs";
import * as usersApi from "./seca-users-web-api.mjs";
import * as groupsApi from "./seca-groups-web-api.mjs";

const PORT = 8080;

console.log("Setting up server");
let app = express();

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors());
app.use(express.json());

//app.get("/events", eventsApi.getSearchedEvents);

app.get("/events/popular", eventsApi._getPopularEvents);

//app.post('/users', usersApi.addUser)

app.get('/groups', groupsApi._getAllGroups)

app.post("/groups", groupsApi._createGroup);

//app.get('/groups/:groupId', groupsApi.getGroup)

//app.put('/groups/:groupId', groupsApi.updateGroup)

app.delete('/groups/:groupId', groupsApi._deleteGroup)

//app.post('/groups/:groupId/events', groupsApi.addEventToGroup)

//app.delete('/groups/:groupId/events/:eventsId', groupsApi.deleteEventFromGroup)

app.listen(PORT, () =>
  console.log(`Server listening in http://localhost:${PORT}`)
);

console.log("End setting up server");
