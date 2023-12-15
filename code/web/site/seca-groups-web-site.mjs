import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

export default function (secaServices) {
  if (!secaServices) {
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
      const token = getToken(req);
      if (!token) {
        rsp.status(401).json({ error: `Invalid authentication token` });
        return;
      }
      req.token = token;
      try {
        return await reqProcessor(req, rsp);
      } catch (e) {
        const rspError = errorToHttp(e);
        rsp.status(rspError.status).json(rspError.body);
      }
    };
  }

  async function getAllGroups(req, rsp) {
    const token = req.token;
    const groups = await secaServices.getAllGroups(token);
    groups.forEach((g) => {
      g.eventId = req.query.eventId;
    });
    return rsp.render("groups", { groups: groups });
  }

  async function getGroupsDetails(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    const groupDetails = await secaServices.getGroupsDetails(idGroup, token);
    rsp.render("groupDetails", groupDetails);
  }

  async function addEventToGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const idEvent = req.query.eventId;
    const token = req.token;
    await secaServices.addEventToGroup(idGroup, idEvent, token);
    rsp.redirect(`/site/groups/${idGroup}`);
  }

  async function createGroup(req, rsp) {
    const name = req.body.name;
    const description = req.body.description;
    const token = req.token;
    await secaServices.createGroup(name, description, token);
    rsp.redirect("/site/groups");
  }

  async function updateGroupPage(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    const event = await secaServices.getGroupsDetails(idGroup, token);
    rsp.render("updateGroup", event);
  }

  async function updateGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const newGroup = {
      name: req.body.name,
      description: req.body.description,
    };
    await secaServices.updateGroup(idGroup, newGroup, req.token);
    rsp.redirect(`/site/groups/${idGroup}`);
  }

  async function deleteGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    await secaServices.deleteGroup(idGroup, token);
    rsp.redirect("/site/groups");
  }

  async function deleteEventFromGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const idEvent = req.params.eventsId;
    const token = req.token;
    await secaServices.deleteEventFromGroup(idGroup, idEvent, token);
    rsp.redirect(`/site/groups/${idGroup}`);
  }

  // Auxiliary functions
  function getToken(req) {
    // TODO: Handle token properly
    return (req.token = "14d72b99-48f6-48d3-94d3-5a4dcfd96c80");
  }
}
