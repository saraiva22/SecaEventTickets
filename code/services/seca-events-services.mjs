import errors from "../errors.mjs"

export default function (secaTmData) {
    if(!secaTmData) {
      throw errors.INVALID_PARAMETER("SECA DATA")
    }

    return {
      getPopularEvents: getPopularEvents
    }

    async function getPopularEvents() {
      return await secaTmData.getPopularEvents()
    }
}
