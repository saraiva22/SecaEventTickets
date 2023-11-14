import cors from 'cors'
import express from 'express'
import * as eventsApi from './seca-events-services.mjs'
import * as usersApi from './seca-users-services.mjs'
import * as groupsApi from './seca-groups-services.mjs'

const PORT = 8080

console.log("Setting up server")
let app = express()

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(express.json())

app.get('/events', eventsApi.getShearchedEvents)

app.get('/events/search', eventsApi.getPopularEvents)

app.get('/users', usersApi.addUser)

app.post('/groups', groupsApi.createGroup)

app.get('/groups/:groupId', groupsApi.getGroup)

app.get('/groups/:groupId', groupsApi.updateGroup)

app.get('/groups/:groupId', groupsApi.deleteGroup)

app.get('/groups/:groupId/events', groupsApi.addEventToGroup)

app.get('/groups/:groupId/events/:eventsId', groupsApi.deleteEventFromGroup)

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

console.log("End setting up server")