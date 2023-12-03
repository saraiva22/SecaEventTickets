import errors from "../../common/errors.mjs";

export default function (secaEventsServices, secaGroupsData, secaUsersData) {
  if (!secaGroupsData) {
    throw errors.INVALID_PARAMETER("GROUPS DATA");
  }
  if (!secaUsersData) {
    throw errors.INVALID_PARAMETER("USERS DATA");
  }
  if (!secaEventsServices) {
    throw errors.INVALID_PARAMETER("USERS DATA");
  }

  return {
    getAllGroups: getAllGroups,
    createGroup: createGroup,
    deleteGroup: deleteGroup,
    getGroupsDetails: getGroupsDetails,
    addEventToGroup: addEventToGroup,
    deleteEventFromGroup: deleteEventFromGroup,
    updateGroup: updateGroup,
  };

  async function getAllGroups(userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    return await secaGroupsData.getAllGroups(userId);
  }

  async function getGroupsDetails(groupId, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    return await getGroup(groupId, userId);
  }

  async function createGroup(groupName, groupDescription, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    const group = {
      name: groupName,
      description: groupDescription,
      userId: userId,
    };
    return await secaGroupsData.createGroup(group);
  }

  async function deleteGroup(groupId, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    const group = await getGroup(groupId, userId);
    return await secaGroupsData.deleteGroup(groupId);
  }

  async function addEventToGroup(groupId, idEvent, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    const group = await getGroup(groupId, userId);
    const event = await secaEventsServices.getEventById(idEvent);
    if (group.events.findIndex((i) => i.id == idEvent) != -1)
      throw errors.EVENT_EXISTS(idEvent);
    return await secaGroupsData.addEventToGroup(groupId, event);
  }

  async function updateGroup(groupId, name, description, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    const group = await getGroup(groupId, userId);
    return await secaGroupsData.updateGroup(groupId, name, description);
  }

  async function deleteEventFromGroup(groupId, eventId, userToken) {
    const userId = await secaUsersData.getUserId(userToken);
    const check = await checkEvent(groupId, userId, eventId);
    return await secaGroupsData.deleteEventFromGroup(groupId, eventId);
  }

  // Auxilry Functions
  async function getGroup(groupId, userId) {
    if (isNaN(Number(groupId))) {
      throw errors.INVALID_ARGUMENT("groupId");
    }
    const group = await secaGroupsData.getGroup(groupId);
    if (group.userId == userId) {
      return group;
    }
    throw errors.NOT_AUTHORIZED();
  }

  async function checkEvent(groupId, userId, eventId) {
    const group = await getGroup(groupId, userId);
    const event = await group.events.findIndex((i) => i.id == eventId);
    if (event == -1) throw errors.EVENT_NOT_FOUND(eventId);
    return event;
  }
}
