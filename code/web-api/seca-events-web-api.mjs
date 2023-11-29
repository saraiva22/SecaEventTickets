import { userInfo } from "os";
import errors from "../errors.mjs";
import errorToHttp from "./errors-to-http-responses.mjs";

const SIZE = 30;
const PAGE = 1;

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    getPopularEvents: getPopularEvents,
    getSearchedEvents: getSearchedEvents,
  };

  async function getPopularEvents(req, rsp) {
    const s = req.query.s  != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    try {
      const popular = await secaServices.getPopularEvents(s,p);
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
    const s = req.query.s  != undefined ? req.query.s : SIZE;
    const p = req.query.p != undefined ? req.query.p : PAGE;
    try {
      const events = await secaServices.getSearchedEvents(keyword,s,p);
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
