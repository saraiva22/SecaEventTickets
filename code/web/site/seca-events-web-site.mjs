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
    getEventDetails: processRequest(getEventDetails),
  };

  function processRequest(reqProcessor) {
    return async function (req, rsp) {
      try {
        return await reqProcessor(req, rsp);
      } catch (e) {
        const rspError = errorToHttp(e);
        rsp.status(rspError.status).render("errors", rspError.body);
      }
    };
  }

  async function getPopularEvents(req, rsp) {
    const s = req.query.s != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    const popular = await secaServices.getPopularEvents(s, p);
    const previousPage = Number(p) > 1 ? Number(p) - 1 : undefined;
    const nextPage = Number(p) < SIZE ? Number(p) + 1 : undefined;
    const size = Number(s) > 0 ? s : undefined;
    rsp.render("popularEvents", {
      events: popular,
      previousPage: previousPage,
      nextPage: nextPage,
      size: size,
      currentPage: p,
    });
  }

  async function getSearchedEvents(req, rsp) {
    const keyword = req.query.keyword;
    const s = req.query.s != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    const events = await secaServices.getSearchedEvents(keyword, s, p);
    const previousPage = Number(p) > 1 ? Number(p) - 1 : undefined;
    const nextPage = Number(p) < SIZE ? Number(p) + 1 : undefined;
    const size = Number(s) > 0 ? s : undefined;
    rsp.render("searchedEvents", {
      events: events,
      keyword: keyword,
      previousPage: previousPage,
      nextPage: nextPage,
      size: size,
      currentPage: p,
    });
  }

  async function getEventDetails(req, rsp) {
    const eventId = req.params.eventId;
    const event = await secaServices.getEventDetails(eventId);
    rsp.render("eventDetails", event);
  }
}
