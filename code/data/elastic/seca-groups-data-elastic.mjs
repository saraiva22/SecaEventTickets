import { get, post, del, put } from "./utils/fetch-wrapper.mjs";
import uriManager from "./utils/uri-manager-elastic.mjs";
import errors from "../../common/errors.mjs";

const INDEX_NAME = "groups";
const URI_MANAGER = await uriManager(INDEX_NAME);

export async function getAllGroups(userId) {
  const uri = `${URI_MANAGER.searchDocs()}?q=userId:${userId}`;
  return await get(uri).then((body) =>
    body.hits.hits.map(createGroupFromElastic)
  );
}

export async function getGroupFromElastic(groupId) {
  const group = await get(URI_MANAGER.getDoc(groupId)).then(
    createGroupFromElastic
  );
  if (group.name != undefined) {
    return group;
  }
  throw errors.GROUP_NOT_FOUND(groupId);
}

export async function createGroup(newGroup) {
  const group = {
    name: newGroup.name,
    description: newGroup.description,
    userId: newGroup.userId,
    events: [],
  };
  return post(URI_MANAGER.createDoc(), group).then((body) => {
    return group;
  });
}

export async function deleteGroup(groupId) {
  return await del(URI_MANAGER.deleteDoc(groupId)).then((body) => {
    return body.id;
  });
}

export async function updateGroup(groupToUpdate) {
  const groupId = groupToUpdate.id;
  groupToUpdate.id = undefined;
  return put(URI_MANAGER.updateDoc(groupId), groupToUpdate).then((body) => {
    return body.result;
  });
}

export async function addEventToGroup(groupId, event) {
  let groupObj = await getGroupFromElastic(groupId);
  groupObj.events.push(event);
  let newGroup = groupObj;
  newGroup.id = undefined;
  return put(URI_MANAGER.updateDoc(groupId), newGroup).then(() => {
    return groupObj;
  });
}

export async function deleteEventFromGroup(groupId, eventId) {
  let group = await removeEvent(groupId, eventId);
  let newGroup = group;
  group.id = undefined;
  return put(URI_MANAGER.updateDoc(groupId), newGroup).then(() => {
    return newGroup;
  });
}

// Auxilary functions
function createGroupFromElastic(groupElastic) {
  let group = Object.assign({ id: groupElastic._id }, groupElastic._source);
  return group;
}

async function removeEvent(groupId, eventId) {
  const group = await getGroupFromElastic(groupId);
  group.events.splice(eventId, 1);
  return group;
}
