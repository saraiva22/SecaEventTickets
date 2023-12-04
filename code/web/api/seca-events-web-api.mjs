import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

const SIZE = 30;
const PAGE = 1;

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    getPopularEvents: processRequest(getPopularEvents),
    getSearchedEvents: processRequest(getSearchedEvents),
  };

  function processRequest(reqProcessor) {
    return async function (req, rsp) {
      try {
        return await reqProcessor(req, rsp);
      } catch (e) {
        const rspError = errorToHttp(e);
        rsp.status(rspError.status).json(rspError.body);
      }
    };
  }

  async function getPopularEvents(req, rsp) {
    const s = req.query.s != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    const popular = await secaServices.getPopularEvents(s, p);
    rsp.status(200).json({
      status: "Success - showing the most popular events",
      popularEvents: popular,
    });
  }

  async function getSearchedEvents(req, rsp) {
    const keyword = req.query.keyword;
    const s = req.query.s != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    const events = await secaServices.getSearchedEvents(keyword, s, p);
    rsp.status(200).json({
      status: "Sucess - searching for events by name: " + keyword,
      searchedEvents: events,
    });
  }
}
