import errors from "../../common/errors.mjs";
import { readFile } from "node:fs/promises";

export default function (secaTmMock, secaGroupsData, secaUsersData) {
  if (!secaTmMock) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }
  if (!secaGroupsData) {
    throw errors.INVALID_PARAMETER("GROUPS DATA");
  }
  if (!secaUsersData) {
    throw errors.INVALID_PARAMETER("USERS DATA");
  }
  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
    getEventById: getEventById,
    addEventToGroup: addEventToGroup,
  };

  async function getPopularEvents() {
    console.log(process.cwd());
    const obj = await readFileEvent("./code/test/getPopularEvents.json");
    const getPopular = await secaTmMock.ObjectEvents(obj);
    if (getPopular) return getPopular;
    throw errors.INVALID_PARAMETER();
  }

  async function getEventById() {
    const obj = await readFileEvent("./code/test/getEventById.json");
    const getEvent = await secaTmMock.ObjectEvents(obj);
    if (getEvent) return getEvent;
    throw errors.EVENT_NOT_FOUND(id);
  }
  async function getSearchedEvents() {
    const obj = await readFileEvent("./code/test/getSearchedEvents.json");
    const searchedEvents = await secaTmMock.ObjectEvents(obj);
    if (searchedEvents) return searchedEvents;
    throw errors.EVENT_NOT_FOUND(`events`);
  }

  async function addEventToGroup(groupId, idEvent, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    const group = await getGroup(groupId, userId);
    const event = await getEventById();
    if (group.events.findIndex((i) => i.id == idEvent) != -1)
      throw errors.EVENT_EXISTS(idEvent);
    return await secaGroupsData.addEventToGroup(groupId, event);
  }

  async function processFile(fileContent) {
    return JSON.parse(fileContent);
  }

  async function readFileEvent(path) {
    try {
      const file = await readFile(path);
      const process = processFile(file);
      return process;
    } catch (error) {
      console.log(error);
    }
  }

  // Auxilry Functions
  async function getGroup(groupId, userId) {
    if (isNaN(Number(groupId))) {
      throw errors.INVALID_ARGUMENT("groupId");
    }
    const group = await secaGroupsData.getGroup(groupId);
    if (group.userId == userId) {
      return group;
    }
    throw errors.NOT_AUTHORIZED();
  }
}
