//curl -X PUT http://localhost:9200/groups
// Create a Group
//curl -X POST --data '{ "title" : "Task1" , "description" : "task 1 elastic", "userId": "iduser" }' -H "Content-Type: application/json" http://localhost:9200/tasks/_doc

import { get, post, del, put } from "./utils/fetch-wrapper.mjs";
import uriManager from "./utils/uri-manager-elastic.mjs";

const INDEX_NAME = "groups";
const URI_MANAGER = await uriManager(INDEX_NAME);

// Initialize elastic search index
//const elasticSearch = elasticSearchInit('groups')

async function getGroupsBody(userId) {
  const query = {
    query: {
      match: {
        userId: userId,
      },
    },
  };
  return post(URI_MANAGER.searchDocs(), query).then((body) =>
    body.hits.hits.map(createGroupFromElastic)
  );
}

export async function getAllGroups(userId) {
  const uri = `${URI_MANAGER.searchDocs()}?q=userId:${userId}`;
  return get(uri).then((body) => body.hits.hits.map(createGroupFromElastic));
}

export async function getGroup(groupId) {
  return get(URI_MANAGER.getDoc(groupId)).then(createGroupFromElastic);
}

export async function createGroup(newGroup) {
  const group = {
    name: newGroup.name,
    description: newGroup.description,
    userId: newGroup.userId,
    events: [],
  };
  return post(URI_MANAGER.createDoc(), group).then((body) => {
    group.id = body._id;
    return group;
  });
}

export async function deleteGroup(groupId) {
  return del(URI_MANAGER.deleteDoc(groupId)).then((body) => body);
}

export async function updateGroup(groupToUpdate) {
  const groupId = groupToUpdate.id;
  groupToUpdate.id = undefined; // porque está a inserir o id no elastic search dentro do "_source"
  return put(URI_MANAGER.updateDoc(groupId), groupToUpdate);
}

export async function addEventToGroup(groupId, event) {
  let groupObj = await getGroup(groupId);
  groupObj.events.push(event);
  let newGroup = groupObj;
  newGroup.id = undefined; // porque está a inserir o id no elastic search dentro do "_source"
  return put(URI_MANAGER.updateDoc(groupId), newGroup).then(() => {
    return groupObj;
  });
}

export async function deleteEventFromGroup(groupId, eventId) {
  let group = await removeEvent(groupId, eventId);
  let newGroup = group;
  group.id = undefined; // porque está a inserir o id no elastic search dentro do "_source"
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
  const group = await getGroup(groupId);
  group.events.splice(eventId, 1);
  return group;
}
