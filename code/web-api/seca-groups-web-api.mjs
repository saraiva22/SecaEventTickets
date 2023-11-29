import errors from "../errors.mjs";
import errorToHttp from "./errors-to-http-responses.mjs";

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
    rsp.status(200).json({
      status: "Success - showing all groups",
      groups: groups,
    });
  }

  async function getGroupsDetails(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    const groupDetails = await secaServices.getGroupsDetails(idGroup, token);
    rsp.status(200).json({
      status: `Success - showing details groups`,
      group: groupDetails,
    });
  }

  async function addEventToGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const idEvent = req.query.id;
    const token = req.token;
    const group = await secaServices.addEventToGroup(idGroup, idEvent, token);
    rsp.status(201).json({
      status: `Success - Added new event (${group.name}) in group ${idGroup} sucessfully`,
      event: group,
    });
  }

  async function createGroup(req, rsp) {
    const name = req.body.name;
    const description = req.body.description;
    const token = req.token;
    const group = await secaServices.createGroup(name, description, token);
    rsp.status(201).json({
      status: "Success - Added new group sucessfully",
      newGroup: group,
    });
  }

  async function updateGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const name = req.body.name;
    const description = req.body.description;
    const token = req.token;
    const update = await secaServices.updateGroup(
      idGroup,
      name,
      description,
      token
    );
    rsp.status(200).json({
      status: `Success - Update group ${idGroup} successfully`,
      group: update,
    });
  }

  async function deleteGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const token = req.token;
    const dlt = await secaServices.deleteGroup(idGroup, token);
    rsp.status(200).json({
      status: `Success - Deleted group ${idGroup} successfully`,
      groups: dlt,
    });
  }

  async function deleteEventFromGroup(req, rsp) {
    const idGroup = req.params.groupId;
    const idEvent = req.params.eventsId;
    const token = req.token;
    const dlt = await secaServices.deleteEventFromGroup(
      idGroup,
      idEvent,
      token
    );
    rsp.status(200).json({
      status: `Success - Deleted event ${idEvent} from group ${idGroup} successfully`,
      groups: dlt,
    });
  }

  // Auxiliary functions
  function getToken(req) {
    const BEARER_STR = "Bearer ";
    const tokenHeader = req.get("Authorization");
    if (
      !(
        tokenHeader &&
        tokenHeader.startsWith(BEARER_STR) &&
        tokenHeader.length > BEARER_STR.length
      )
    ) {
      return null;
    }
    req.token = tokenHeader.split(" ")[1];
    return req.token;
  }
}
