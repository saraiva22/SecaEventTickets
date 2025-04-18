import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

export default function (secaGroupsServices, secaUsersServices) {
  if (!secaGroupsServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  if (!secaUsersServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    getAllGroups: processRequest(getAllGroups),
    createGroup: processRequest(createGroup),
    deleteGroup: processRequest(deleteGroup),
    getGroupsDetails: processRequest(getGroupsDetails),
    addEventToGroup: processRequest(addEventToGroup),
    deleteEventFromGroup: processRequest(deleteEventFromGroup),
    updateGroup: processRequest(updateGroup),
    updateGroupPage: processRequest(updateGroupPage),
  };

  function processRequest(reqProcessor) {
    return async function (req, rsp) {
      const token = await getToken(req);
      if (!token) {
        rsp.status(401).render("errors", {
          code: NaN,
          error: `Invalid authentication token`,
        });
        return;
      }
      req.token = token;
      try {
        return await reqProcessor(req, rsp);
      } catch (e) {
        const rspError = errorToHttp(e);
        rsp.status(rspError.status).render("errors", rspError.body);
      }
    };
  }

  async function getAllGroups(req, rsp) {
    const token = req.token;
    const s = req.query.s != undefined ? req.query.s : 10;
    const p = req.query.p != undefined ? req.query.p : 0;
    const previousPage = Number(p) > 0 ? Number(p) - 1 : undefined;
    const nextPage = await getNextPage(token, s, p);
    const groups = await secaGroupsServices.getAllGroups(token, s, p);
    groups.forEach((g) => {
      g.eventId = req.query.eventId;
    });
    return rsp.render("groups", {
      groups: groups,
      token: token,
      size: s,
      previousPage: previousPage,
      nextPage: nextPage,
      currentPage: p,
    });
  }

  async function getGroupsDetails(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    const groupDetails = await secaGroupsServices.getGroupsDetails(
      idGroup,
      token
    );
    groupDetails.token = token;
    rsp.render("groupDetails", groupDetails);
  }

  async function addEventToGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const idEvent = req.query.eventId;
    const token = req.token;
    await secaGroupsServices.addEventToGroup(idGroup, idEvent, token);
    rsp.redirect(`/site/groups/${idGroup}`);
  }

  async function createGroup(req, rsp) {
    const name = req.body.name;
    const description = req.body.description;
    const token = req.token;
    await secaGroupsServices.createGroup(name, description, token);
    rsp.redirect("/site/groups");
  }

  async function updateGroupPage(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    const event = await secaGroupsServices.getGroupsDetails(idGroup, token);
    event.token = token;
    rsp.render("updateGroup", event);
  }

  async function updateGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const newGroup = {
      name: req.body.name,
      description: req.body.description,
    };
    await secaGroupsServices.updateGroup(idGroup, newGroup, req.token);
    rsp.redirect(`/site/groups/${idGroup}`);
  }

  async function deleteGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    await secaGroupsServices.deleteGroup(idGroup, token);
    rsp.redirect("/site/groups");
  }

  async function deleteEventFromGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const idEvent = req.params.eventsId;
    const token = req.token;
    await secaGroupsServices.deleteEventFromGroup(idGroup, idEvent, token);
    rsp.redirect(`/site/groups/${idGroup}`);
  }

  // Auxiliary functions
  async function getToken(req) {
    const username = req.user.username;
    const user = await secaUsersServices.getUserByUsername(username);
    return user.token;
  }

  async function getNextPage(token, size, page) {
    const next = Number(page) + 1;
    const checkNext = await secaGroupsServices.getAllGroups(token, size, next);
    return checkNext.length != 0 ? next : undefined;
  }
}
