import errors from "../errors.mjs";

export default function (secaTmData) {
  if (!secaTmData) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
  };

  async function getPopularEvents() {
    return await secaTmData.getPopularEvents();
  }

  async function getSearchedEvents(keyword) {
    isValidString(keyword);
    return await secaTmData.getSearchedEventske(keyword);
  }
}

// Auxiliary functions

function isValidString(value) {
  return value.constructor == String && value != "";
}
