import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

const SIZE = 20;
const PAGE = 1;

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    getPopularEvents: processRequest(getPopularEvents),
    getSearchedEvents: processRequest(getSearchedEvents),
    getEventDetails: processRequest(getEventDetails),
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
    rsp.render("popularEvents", { events: popular });
  }

  async function getSearchedEvents(req, rsp) {
    const keyword = req.query.keyword;
    const s = req.query.s != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    const events = await secaServices.getSearchedEvents(keyword, s, p);
    rsp.render("searchedEvents", { events: events });
  }

  async function getEventDetails(req, rsp) {
    const eventId = req.params.eventId;
    const event = await secaServices.getEventDetails(eventId);
    rsp.render("eventDetails", event);
  }
}
