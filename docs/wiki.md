## Application Structure

### Overview

The application is structured into two major components: the server component and the client component. The server component is responsible for data access, manipulation, storage, handling HTTP requests and responses, and managing internal errors. The client component handles client interactions such as user login and signup.

### Modules

1. Server Entry Point - seca-server.mjs:

The main entry point of the server application, seca-server.mjs, manages the server routes. It acts as a traffic controller, directing incoming requests to the appropriate modules for processing. 

2. Web API Communication - seca-web-api:

The seca-web-api module facilitates communication between the client and server through JSON responses. Services are accessible without a graphical interface, which helps fast communication between client and server. 

3. User Interface - seca-web-site:

The user interface is handled by seca-web-site. The use of HandleBars formatting language allows dynamic content, while CSS ensures a visually appealing experience. This module prioritizes simplicity and efficiency in displaying essential information to users.

4. API services - seca-services:

seca-services.mjs is dedicated to implement all the API available services. Is the bridge between the server and data storage/database. It plays a critical role in ensuring the reliability of the server by throwing exceptions and checking each request before storing data. 

5. TM API Integration - tm-events-data:

The tm-events-data module communicates with the TicketMaster API, allowing the application to retrieve events details, search for specific events by name, and display popular events.

6. Elastic Database Management - seca-data-elastic:

The seca-data-elastic module serves as the foundation for tracking individual user information, managing the addition and removal of groups and events, and updating group information. It also handles user credentials for validation and registration.

7. User Authentication and Authorization - seca-users-web-site.mjs:

Handling all login and signup actions, the seca-users-web-site.mjs module is responsible for user authentication and authorization. It grants authorized users access to their individual information and enables actions such as adding or removing groups and events. 


## Data Storage Design

For data storage was used ElasticSearch database, organized in 2 indices:

### Users

The user index serves as the repository for all user-related data, including username, password, userId, and token. When creating a new user, the system checks the chosen username to ensure that it is unique. A new user is then added to the database. During the login process, the system utilizes the _search method to verify the existence of a user with matching credentials (username and password) before granting access. 

### Groups

The groups index stores data related to each group, including name, description, events, user_Id, groupId, and token. The user_Id within the group information is crucial as it establishes the relationship between a user and their groups. To remove a event from a group, a script is executed to delete the event from the events array within the group, simplifying the data structure. 


## How to run

First run the following commands:

npm init
npm install express
npm install express-session
npm install url
npm install cors
npm install hbs
npm install passport
npm install swagger-ui-express
npm install yamljs
npm install path
npm install morgan
npm install express-session
npm install cookie-parser
npm install body-parser

