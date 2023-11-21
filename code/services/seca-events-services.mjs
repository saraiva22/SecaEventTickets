import errors from "../errors.mjs";

export default function (secaTmData) {
  if (!secaTmData) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
    getEventsById: getEventsById
  };

  async function getPopularEvents() {
    return await secaTmData.getPopularEvents();
  }

  async function getEventsById(id) {
    return await secaTmData.getEventsById(id);
  }
  async function getSearchedEvents(keyword) {
    isValidString(keyword); /// AQUI VAI DAR EXCEÇãO temos de tratar
    return await secaTmData.getSearchedEvents(keyword);
  }

  as
}



// Auxiliary functions

function isValidString(value) {
  return value.constructor == String && value != "";
}
