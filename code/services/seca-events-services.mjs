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
    console.log(keyword)
    isValidString(keyword); /// AQUI VAI DAR EXCEÇãO temos de tratar
    return await secaTmData.getSearchedEvents(keyword);
  }
}

// Auxiliary functions

function isValidString(value) {
  return value.constructor == String && value != "";
}
