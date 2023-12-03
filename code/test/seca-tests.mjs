import assert from "assert";

// DATA IMPORTS
import * as secaTmData from "../data/tm-events-data.mjs";
import * as secaGroupsData from "../data/local/seca-groups-data-mem.mjs";
import * as secaUsersData from "../data/local/seca-users-data-mem.mjs";
// SERVICE IMPORTS
import mockEventsService from "./mockOfSecaServices.mjs";
import usersService from "../services/seca-users-services.mjs";
import groupsService from "../services/seca-groups-services.mjs";

import { describe, it } from "node:test";

// Test : npx mocha ./code/test/services-test.mjs

const secaServices = mockEventsService(
  secaTmData,
  secaGroupsData,
  secaUsersData
);
const secaGroupServices = groupsService(
  secaTmData,
  secaGroupsData,
  secaUsersData
);
const secaUsersService = usersService(secaUsersData);

describe("SECA services", function () {
  describe("SECA Tests Events", function () {
    describe("SECA Tests Events - Get Popular Events and Get Searched Event", function () {
      it("should return an object that is not undefined", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert(obj !== undefined);
        assert(obj1 !== undefined);
        assert(obj2 !== undefined);
      });

      it("should return an array with more than 0 items", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert(obj.length > 0);
        assert(obj1.length > 0);
        assert(obj2.length > 0);
      });

      it("should have the first element with id", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(obj[0].id, "G5v0Z9Yc3BZyy");
        assert.deepEqual(obj1[0].id, "vvG1zZ9YJwb39L");
        assert.deepEqual(obj2[0].id, "vvG1HZ9gn1xYD3");
      });

      it("should have the first element with name", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(obj[0].name, "Phoenix Suns vs. Memphis Grizzlies");
        assert.deepEqual(obj1[0].name, "Atlanta Hawks vs. Phoenix Suns");
        assert.deepEqual(
          obj2[0].name,
          "Oregon Ducks Men's Basketball vs. UCLA Bruins Men's Basketball"
        );
      });

      it("should have the first element with date", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(obj[0].date, "2023-12-02");
        assert.deepEqual(obj1[0].date, "2024-02-02");
        assert.deepEqual(obj2[0].date, "2023-12-30");
      });

      it("should have the first element with time", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(obj[0].time, "19:00:00");
        assert.deepEqual(obj1[0].time, "19:30:00");
        assert.deepEqual(obj2[0].time, "13:00:00");
      });

      it("should have the first element with segment", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(obj[0].segment, "Sports");
        assert.deepEqual(obj1[0].segment, "Sports");
        assert.deepEqual(obj2[0].segment, "Sports");
      });

      it("should have the first element with genre", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(obj[0].genre, "Basketball");
        assert.deepEqual(obj1[0].genre, "Basketball");
        assert.deepEqual(obj2[0].genre, "Basketball");
      });

      it("should have the first element with url", async function () {
        //Arrange
        // Act
        const obj = await secaServices.getPopularEvents();
        const obj1 = await secaServices.getEventById();
        const obj2 = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(
          obj[0].url,
          "https://www.ticketmaster.com/phoenix-suns-vs-memphis-grizzlies-phoenix-arizona-12-02-2023/event/19005F0B52E80E79"
        );
        assert.deepEqual(
          obj1[0].url,
          "https://www.ticketmaster.com/atlanta-hawks-vs-phoenix-suns-atlanta-georgia-02-02-2024/event/0E005F09B26125DF"
        );
        assert.deepEqual(
          obj2[0].url,
          "https://www.ticketmaster.com/oregon-ducks-mens-basketball-vs-ucla-eugene-oregon-12-30-2023/event/0F005F5A8A8B0ED2"
        );
      });

      it("should return undefined since that index does not exist", async function () {
        //Arrange
        // Act
        const group = await secaServices.getPopularEvents();
        // Assert
        assert.deepEqual(group[1000], undefined);
      });

      it("should only return a few properties since there aren't all of them in that index", async function () {
        //Arrange
        const expectedGroup = {
          id: "Za5ju3rKuqZDvGu-5kUetZHhQ1aKWdDo29",
          name: "Football  CardsPass",
          date: "2023-12-01",
          time: "20:00:00",
          segment: undefined,
          genre: undefined,
          url: undefined,
        };
        // Act
        const group = await secaServices.getSearchedEvents();
        // Assert
        assert.deepEqual(group[20].id, expectedGroup.id);
        assert.deepEqual(group[20].name, expectedGroup.name);
        assert.deepEqual(group[20].date, expectedGroup.date);
        assert.deepEqual(group[20].time, expectedGroup.time);
        assert.deepEqual(group[20].segment, expectedGroup.segment);
        assert.deepEqual(group[20].genre, expectedGroup.genre);
        assert.deepEqual(group[20].url, expectedGroup.url);
      });
    });
  });

  describe("SECA Groups Tests", function () {
    // VALIDE USERS TOKEN
    const TOKEN0 = "14d72b99-48f6-48d3-94d3-5a4dcfd96c80";
    const TOKEN1 = "14d72b99-48f6-48d3-94d3-5a4dcfd96c81";
    describe("SECA Groups Tests - Create New Group", function () {
      it("should return an object with the details of the new group", async function () {
        //Arrange
        const expectedGroup = {
          id: 6,
          name: "Group Test",
          description: "Testing Group Service Functions",
          userId: 1,
          events: [],
        };
        // Act
        const createGroup = await secaGroupServices.createGroup(
          "Group Test",
          "Testing Group Service Functions",
          TOKEN1
        );
        // Assert;
        assert.deepEqual(createGroup, expectedGroup);
      });

      it("should return an object with the details of the new group", async function () {
        //Arrange
        const expectedGroup = {
          id: 7,
          name: "Group Test",
          description: "Testing Group Service Functions",
          userId: 0,
          events: [],
        };
        // Act
        const createGroup = await secaGroupServices.createGroup(
          "Group Test",
          "Testing Group Service Functions",
          TOKEN0
        );
        // Assert
        assert.deepEqual(createGroup, expectedGroup);
      });
    });

    describe("SECA Groups Tests  - Get Group Details", function () {
      it("should return the detailed groups", async function () {
        //Arrange
        const groupId = 4;
        const expectedGroup = {
          id: 4,
          name: "Group 4",
          userId: 0,
          description: "Group 4 description",
          events: [
            {
              date: "2024-01-19",
              genre: "Basketball",
              id: "Z7r9jZ1AdJ9uK",
              name: "New Orleans Pelicans vs. Phoenix Suns",
              segment: "Sports",
              time: "19:00:00",
              url: "https://www.ticketmaster.com/event/Z7r9jZ1AdJ9uK",
            },
          ],
        };
        // Act
        const group = await secaGroupServices.getGroupsDetails(groupId, TOKEN0);
        // Assert
        assert.deepEqual(group, expectedGroup);
      });

      it("should return an exception indicating that the user was not found", async function () {
        //Arrange
        const groupId = 4;
        const userId = "14d72b99-48f6sdfdsf";
        const expectedError = {
          code: 2,
          description: "User Not Found",
        };
        // Act
        try {
          await secaGroupServices.getGroupsDetails(groupId, userId);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should return an exception indicating that the group was not found", async function () {
        //Arrange
        const groupId = 20;
        const expectedError = {
          code: 3,
          description: "Group 20 not found",
        };
        // Act
        try {
          await secaGroupServices.getGroupsDetails(groupId, TOKEN0);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });
    });

    describe("SECA Groups Tests - Get All Groups", function () {
      it("should return an array with all groups that belong to user 0", async function () {
        //Arrange
        const expectedArray = [
          {
            id: 0,
            name: "Group 0",
            description: "Group 0 description",
            userId: 0,
            events: [],
          },
          {
            id: 2,
            name: "Group 2",
            description: "Group 2 description",
            userId: 0,
            events: [],
          },
          {
            id: 4,
            name: "Group 4",
            description: "Group 4 description",
            userId: 0,
            events: [
              {
                date: "2024-01-19",
                genre: "Basketball",
                id: "Z7r9jZ1AdJ9uK",
                name: "New Orleans Pelicans vs. Phoenix Suns",
                segment: "Sports",
                time: "19:00:00",
                url: "https://www.ticketmaster.com/event/Z7r9jZ1AdJ9uK",
              },
            ],
          },
          {
            id: 7,
            name: "Group Test",
            description: "Testing Group Service Functions",
            userId: 0,
            events: [],
          },
        ];
        // Act
        const allGroups = await secaGroupServices.getAllGroups(TOKEN0);
        // Assert
        assert.deepEqual(allGroups, expectedArray);
      });

      it("should return an array with all groups that belong to user 1", async function () {
        //Arrange
        const expectedArray = [
          {
            id: 1,
            name: "Group 1",
            description: "Group 1 description",
            userId: 1,
            events: [],
          },
          {
            id: 3,
            name: "Group 3",
            description: "Group 3 description",
            userId: 1,
            events: [],
          },
          {
            id: 6,
            name: "Group Test",
            description: "Testing Group Service Functions",
            userId: 1,
            events: [],
          },
        ];
        // Act
        const allGroups = await secaGroupServices.getAllGroups(TOKEN1);
        // Assert
        assert.deepEqual(allGroups, expectedArray);
      });
    });

    describe("SECA Groups Tests - Delete Group", async function () {
      it("should return an object corresponding to the deleted group", async function () {
        // Arrange
        const expectedGroup = {
          id: 6,
          name: "Group Test",
          description: "Testing Group Service Functions",
          userId: 1,
          events: [],
        };
        const expectedArray = [
          {
            id: 1,
            name: "Group 1",
            description: "Group 1 description",
            userId: 1,
            events: [],
          },
          {
            id: 3,
            name: "Group 3",
            description: "Group 3 description",
            userId: 1,
            events: [],
          },
        ];
        // Act
        const deletedGroup = await secaGroupServices.deleteGroup(6, TOKEN1);
        const allGroups = await secaGroupServices.getAllGroups(TOKEN1);
        // Assert
        assert.deepEqual(deletedGroup, expectedGroup);
        assert.deepEqual(allGroups, expectedArray);
      });

      it("should throw user not found exception", async function () {
        // Arrange
        const fakeToken = "14d72b99-48f6-48d3-94d3-5a4dcfd96c";
        const expectedError = {
          code: 2,
          description: "User Not Found",
        };
        // Act
        try {
          await secaGroupServices.deleteGroup(1, fakeToken);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should throw user not found exception", async function () {
        // Arrange
        const expectedError = {
          code: 4,
          description: "Not authorized",
        };
        // Act
        try {
          await secaGroupServices.deleteGroup(1, TOKEN0);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });
    });

    describe("SECA Groups Tests - Update Group", async function () {
      it("should return the updated group", async function () {
        //Arrange
        const groupId = 4;
        const name = "Francisco & Carolina";
        const description = "SECA API 2324 IPW";
        const expectedGroup = {
          id: 4,
          name: "Francisco & Carolina",
          description: "SECA API 2324 IPW",
          userId: 0,
          events: [
            {
              id: "Z7r9jZ1AdJ9uK",
              name: "New Orleans Pelicans vs. Phoenix Suns",
              date: "2024-01-19",
              time: "19:00:00",
              segment: "Sports",
              genre: "Basketball",
              url: "https://www.ticketmaster.com/event/Z7r9jZ1AdJ9uK",
            },
          ],
        };
        // Act
        const group = await secaGroupServices.updateGroup(
          groupId,
          name,
          description,
          TOKEN0
        );
        // Assert
        assert.deepEqual(group, expectedGroup);
      });

      it("should return an exception indicating that the user was not found", async function () {
        //Arrange
        const groupId = 4;
        const userId = "14d72b99-48f6sdfdsf";
        const name = "Francisco & Carolina";
        const description = "SECA API 2324 IPW";
        const expectedError = {
          code: 2,
          description: "User Not Found",
        };
        // Act
        try {
          await secaGroupServices.updateGroup(
            groupId,
            name,
            description,
            userId
          );
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should return an exception indicating that the group was not found", async function () {
        //Arrange
        const groupId = 20;
        const name = "Francisco & Carolina";
        const description = "SECA API 2324 IPW";
        const expectedError = {
          code: 3,
          description: "Group 20 not found",
        };
        // Act
        try {
          await secaGroupServices.updateGroup(
            groupId,
            name,
            description,
            TOKEN0
          );
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });
    });

    describe("SECA Groups Tests - Add Event To a Group", async function () {
      it("sohuld return added event to group", async function () {
        //  Arrange
        const groupId = 4;
        const idEvent = "vvG1zZ9YJwb39L";
        const newEvent = {
          id: "vvG1zZ9YJwb39L",
          name: "Atlanta Hawks vs. Phoenix Suns",
          date: "2024-02-02",
          time: "19:30:00",
          segment: "Sports",
          genre: "Basketball",
          url: "https://www.ticketmaster.com/atlanta-hawks-vs-phoenix-suns-atlanta-georgia-02-02-2024/event/0E005F09B26125DF",
        };
        // Act
        const group = await secaServices.addEventToGroup(
          groupId,
          idEvent,
          TOKEN0
        );
        // Assert
        assert(group, newEvent);
      });

      it("should return an exception indicating that the user was not found", async function () {
        //  Arrange
        const groupId = 4;
        const idEvent = "vvG1zZ9YJwb39L";
        const userToken = "14d72b99-48f6sdfdsf";
        const expectedError = {
          code: 2,
          description: "User Not Found",
        };
        // Act
        try {
          await secaServices.addEventToGroup(groupId, idEvent, userToken);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should return an exception indicating that the group was not found", async function () {
        //  Arrange
        const groupId = 20;
        const idEvent = "vvG1zZ9YJwb39L";
        const expectedError = {
          code: 3,
          description: "Group 20 not found",
        };
        // Act
        try {
          await secaServices.addEventToGroup(groupId, idEvent, TOKEN0);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should return an exception indicating that the event was not found", async function () {
        //  Arrange
        const groupId = 4;
        const idEvent = "vvG1zZ9YJdsfdsfwb39L";
        const expectedError = {
          code: 4,
          description: "Event vvG1zZ9YJdsfdsfwb39L not found",
        };
        // Act
        try {
          await secaServices.addEventToGroup(groupId, idEvent, TOKEN0);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should return an exception indicating that the event already exists", async function () {
        //  Arrange
        const groupId = 4;
        const idEvent = "Z7r9jZ1AdJ9uK";
        const expectedError = {
          code: 5,
          description: "Event with id Z7r9jZ1AdJ9uK already exists",
        };
        // Act
        try {
          await secaServices.addEventToGroup(groupId, idEvent, TOKEN0);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      describe("SECA Groups Tests - Remove Event From a Group", async function () {
        it("should return an object corresponding to the deleted event", async function () {
          // Arrange
          const groupId = 4;
          const eventId = "Z7r9jZ1AdJ9uK";
          const expectedEvent = {
            id: "Z7r9jZ1AdJ9uK",
            name: "New Orleans Pelicans vs. Phoenix Suns",
            date: "2024-01-19",
            time: "19:00:00",
            segment: "Sports",
            genre: "Basketball",
            url: "https://www.ticketmaster.com/event/Z7r9jZ1AdJ9uK",
          };
          // Act
          const deletedEvent = await secaGroupServices.deleteEventFromGroup(
            groupId,
            eventId,
            TOKEN0
          );
          // Assert
          assert.deepEqual(deletedEvent, expectedEvent);
        });

        it("should throw user not found exception", async function () {
          // Arrange
          const groupId = 4;
          const eventId = "Z7r9jZ1AdJ9uK";
          const fakeToken = "14d72b99-48f6-48d3-94d3-5a4dcfd96c";
          const expectedError = {
            code: 2,
            description: "User Not Found",
          };
          // Act
          try {
            await secaGroupServices.deleteEventFromGroup(
              groupId,
              eventId,
              fakeToken
            );
          } catch (error) {
            // Assert
            assert.deepEqual(error, expectedError);
            assert(error.code === expectedError.code);
            assert(error.description === expectedError.description);
          }
        });

        it("should throw group not found exception", async function () {
          // Arrange
          const groupId = 12;
          const eventId = "Z7r9jZ1AdJ9uK";
          const expectedError = {
            code: 3,
            description: "Group 12 not found",
          };
          // Act
          try {
            await secaGroupServices.deleteEventFromGroup(
              groupId,
              eventId,
              TOKEN0
            );
          } catch (error) {
            // Assert
            assert.deepEqual(error, expectedError);
            assert(error.code === expectedError.code);
            assert(error.description === expectedError.description);
          }
        });

        it("should throw event not found exception", async function () {
          // Arrange
          const groupId = 2;
          const eventId = "ty12ASo";
          const expectedError = {
            code: 6,
            description: "Event with id ty12ASo not found",
          };
          // Act
          try {
            await secaGroupServices.deleteEventFromGroup(
              groupId,
              eventId,
              TOKEN0
            );
          } catch (error) {
            // Assert
            assert.deepEqual(error, expectedError);
            assert(error.code === expectedError.code);
            assert(error.description === expectedError.description);
          }
        });

        it("should throw unauthorized exception", async function () {
          // Arrange
          const groupId = 2;
          const eventId = "Z7r9jZ1AdJ9uK";
          const expectedError = {
            code: 4,
            description: "Not authorized",
          };
          // Act
          try {
            await secaGroupServices.deleteEventFromGroup(
              groupId,
              eventId,
              TOKEN1
            );
          } catch (error) {
            // Assert
            assert.deepEqual(error, expectedError);
            assert(error.code === expectedError.code);
            assert(error.description === expectedError.description);
          }
        });
      });
    });
  });

  describe("SECA Users Tests", function () {
    describe("SECA Users Tests - Add User and Get Ids", async function () {
      const TOKEN0 = "14d72b99-48f6-48d3-94d3-5a4dcfd96c80";
      const TOKEN1 = "14d72b99-48f6-48d3-94d3-5a4dcfd96c81";
      const obj = await secaUsersService.createUser("Alberto");
      const obj1 = await secaUsersService.createUser("Cenourinhas");

      it("should return an object that is not undefined", async function () {
        //Arrange
        const obj = await secaUsersService.getUserId(TOKEN0);
        const obj1 = await secaUsersService.getUserId(TOKEN1);
        // Act
        // Assert
        assert(obj !== undefined);
        assert(obj1 !== undefined);
      });

      it("should return the ids associated to the different tokens", async function () {
        //Arrange
        const obj = await secaUsersService.getUserId(TOKEN0);
        const obj1 = await secaUsersService.getUserId(TOKEN1);
        // Act
        // Assert
        assert(obj == 0);
        assert(obj1 == 1);
      });

      it("should return user's ids of new users", async function () {
        //Arrange
        // Act
        // Assert
        assert(obj.id == 2);
        assert(obj1.id == 3);
      });

      it("should return user's usernames of new users", async function () {
        //Arrange
        // Act
        // Assert
        assert(obj.name == "Alberto");
        assert(obj1.name == "Cenourinhas");
      });

      it("should return user's token of new users", async function () {
        //Arrange
        // Act
        // Assert
        assert(obj.token !== undefined);
        assert(obj1.token !== undefined);
      });

      it("should throw user exists exception", async function () {
        // Arrange
        const expectedError = {
          code: 7,
          description: "User with username Carolina already exists",
        };
        // Act
        try {
          await secaUsersService.createUser("Carolina");
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });

      it("should throw user not found exception", async function () {
        // Arrange
        const fakeToken = "14d72b99-48f6-48d3-94d3-5a4dcfd96";
        const expectedError = {
          code: 2,
          description: "User Not Found",
        };
        // Act
        try {
          await secaUsersService.getUserId(fakeToken);
        } catch (error) {
          // Assert
          assert.deepEqual(error, expectedError);
          assert(error.code === expectedError.code);
          assert(error.description === expectedError.description);
        }
      });
    });
  });
});
