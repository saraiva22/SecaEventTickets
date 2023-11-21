import errors from "../errors.mjs";
import errorToHttp from "./errors-to-http-responses.mjs";

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
  };

  async function getPopularEvents(req, rsp) {
    try {
      const popular = await secaServices.getPopularEvents();
      rsp.status(200).json({
        status: "Success - showing the most popular events",
        popularEvents: popular,
      });
    } catch (err) {
      rsp.status(400).json({
        status: "Failure - failed to get the most popular events",
      });
    }
  }

  async function getSearchedEvents(req, rsp) {
    const keyword = req.query.keyword;
    //console.log(keyword)
    try {
      const events = await secaServices.getSearchedEvents(keyword);
      rsp.status(200).json({
        status: "Sucess - searching for events by name: " + keyword,
        searchedEvents: events,
      });
    } catch (err) {
      console.log(err);
      rsp.status(400).json({
        status: "Failure - failed to get showing the most popular events",
      });
    }
  }
}
