import errors from "../errors.mjs";

export default function (secaTmData) {
  if (!secaTmData) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
    getEventById: getEventById,
  };

  async function getPopularEvents(s, p) {
    const getPopular = await secaTmData.getPopularEvents(s, p);
    if (getPopular) return getPopular;
    throw errors.INVALID_PARAMETER(`Invalid size = ${s} or page = ${p} `);
  }

  async function getEventById(id) {
    const getEvent = await secaTmData.getEventById(id);
    if (getEvent) return getEvent;
    throw errors.EVENT_NOT_FOUND(id);
  }
  async function getSearchedEvents(keyword, s, p) {
    if (!isValidString(keyword))
      throw errors.INVALID_PARAMETER(",must be a string");
    const searchedEvents = await secaTmData.getSearchedEvents(keyword, s, p);
    if (searchedEvents) return searchedEvents;
    throw errors.EVENT_NOT_FOUND(`events in ${keyword}`);
  }
}

// Auxiliary functions
function isValidString(value) {
  return value.constructor == String && value != "";
}
