import assert from "assert";

// DATA IMPORTS
import * as secaTmData from "./data/tm-events-data.mjs";
import * as secaGroupsData from "./data/local/seca-groups-data-mem.mjs";
import * as secaUsersData from "./data/local/seca-users-data-mem.mjs";
// SERVICE IMPORTS
import eventsService from "./services/seca-events-services.mjs";
import usersService from "./services/seca-users-services.mjs";
import groupsService from "./services/seca-groups-services.mjs";
import crypto from "crypto";
import { describe } from "node:test";

const secaGroupServices = secaGroupServices(
  secaTmData,
  secaGroupsData,
  secaUsersData
);

describe("SECA services", function () {});

// Helper function

async function createUserTest() {
  const newUser = await secaUsersData.createUser("Test");
  return newUser.token;
}
