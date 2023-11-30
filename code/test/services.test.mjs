import assert from "assert";

// DATA IMPORTS
import * as secaTmData from "../data/tm-events-data.mjs";
import * as secaGroupsData from "../data/local/seca-groups-data-mem.mjs";
import * as secaUsersData from "../data/local/seca-users-data-mem.mjs";
// SERVICE IMPORTS
import mockEventsService from "./mockOfSecaServices.mjs";
import usersService from "../services/seca-users-services.mjs";
import groupsService from "../services/seca-groups-services.mjs";

import crypto from "crypto";
import { describe } from "node:test";
import secaEventsServices from "../services/seca-events-services.mjs";

// Test : npx mocha ./code/test/services-test.mjs

const secaServices = mockEventsService(secaTmData);


describe("SECA services", function () {
  describe("SECA Tests Events", function () {
    it("should return an object that is not undefined", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert(obj !== undefined);
      assert(obj1 !== undefined);
      assert(obj2 !== undefined);
    });

    it("should return an array with more than 0 items", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert(obj.length > 0);
      assert(obj1.length > 0);
      assert(obj2.length > 0);
    });

    it("should have the first element with id", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(obj[0].id, "G5v0Z9Yc3BZyy");
      assert.deepEqual(obj1[0].id, "Z7r9jZ1AdJ9uK");
      assert.deepEqual(obj2[0].id, "vvG1HZ9gn1xYD3");
    });

    it("should have the first element with name", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(obj[0].name, "Phoenix Suns vs. Memphis Grizzlies");
      assert.deepEqual(obj1[0].name, "New Orleans Pelicans vs. Phoenix Suns");
      assert.deepEqual(
        obj2[0].name,
        "Oregon Ducks Men's Basketball vs. UCLA Bruins Men's Basketball"
      );
    });

    it("should have the first element with date", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(obj[0].date, "2023-12-02");
      assert.deepEqual(obj1[0].date, "2024-01-19");
      assert.deepEqual(obj2[0].date, "2023-12-30");
    });

    it("should have the first element with time", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(obj[0].time, "19:00:00");
      assert.deepEqual(obj1[0].time, "19:00:00");
      assert.deepEqual(obj2[0].time, "13:00:00");
    });

    it("should have the first element with segment", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(obj[0].segment, "Sports");
      assert.deepEqual(obj1[0].segment, "Sports");
      assert.deepEqual(obj2[0].segment, "Sports");
    });

    it("should have the first element with genre", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(obj[0].genre, "Basketball");
      assert.deepEqual(obj1[0].genre, "Basketball");
      assert.deepEqual(obj2[0].genre, "Basketball");
    });

    it("should have the first element with url", async function () {
      //Arrange
      const obj = await secaServices.getPopularEvents();
      const obj1 = await secaServices.getEventById();
      const obj2 = await secaServices.getSearchedEvents();
      // Act
      // Assert
      assert.deepEqual(
        obj[0].url,
        "https://www.ticketmaster.com/phoenix-suns-vs-memphis-grizzlies-phoenix-arizona-12-02-2023/event/19005F0B52E80E79"
      );
      assert.deepEqual(
        obj1[0].url,
        "https://www.ticketmaster.com/event/Z7r9jZ1AdJ9uK"
      );
      assert.deepEqual(
        obj2[0].url,
        "https://www.ticketmaster.com/oregon-ducks-mens-basketball-vs-ucla-eugene-oregon-12-30-2023/event/0F005F5A8A8B0ED2"
      );
    });
  });
});

// Helper function
/*
async function createUserTest() {
  const newUser = await secaUsersData.createUser("Test");
  return newUser.token;
}

*/
