import errors from "../errors.mjs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export default function (secaTmMock) {
  if (!secaTmMock) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
    getEventById: getEventById,
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
}
