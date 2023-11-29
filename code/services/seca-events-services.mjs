import errors from "../errors.mjs";

export default function (secaTmData) {
  if (!secaTmData) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
    getEventById: getEventById
  };

  async function getPopularEvents(s,p) {
    return await secaTmData.getPopularEvents(s,p);
  }

  async function getEventById(id) {
    return await secaTmData.getEventById(id);
  }
  async function getSearchedEvents(keyword,s,p) {
    isValidString(keyword); /// AQUI VAI DAR EXCEÇãO temos de tratar
    return await secaTmData.getSearchedEvents(keyword,s,p);
  }
}

// Auxiliary functions
function isValidString(value) {
  return value.constructor == String && value != "";
}
