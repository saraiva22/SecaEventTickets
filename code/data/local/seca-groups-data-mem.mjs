import errors from "../../errors.mjs";

const NUM_GROUPS = 5;

let GROUPS = new Array(NUM_GROUPS).fill(0).map((v, idx) => {
  return {
    id: idx,
    name: `Group ${idx}`,
    description: `Group ${idx} description`,
    userId: idx % 2,
    events: [],
  };
});
// GROUPS.filter((g) => g.id == 4 && g.userId == 0).map((g) => g.events.push(
//   {
//     "id": "Z7r9jZ1AdJ9uK",
//     "name": "New Orleans Pelicans vs. Phoenix Suns",
//     "date": "2024-01-19",
//     "time": "19:00:00",
//     "segment": "Sports",
//     "genre": "Basketball",
//     "url": "https://www.ticketmaster.com/event/Z7r9jZ1AdJ9uK"
// }
// ));

let nextId = GROUPS.length + 1;

export async function getAllGroups(userId) {
  return Promise.resolve(GROUPS.filter((t) => t.userId == userId));
}

export async function getGroup(groupId) {
  const groupIdx = getGroupIdx(groupId);
  return GROUPS[groupIdx];
}

export async function createGroup(newGroup) {
  const group = {
    id: nextId++,
    name: newGroup.name,
    description: newGroup.description,
    userId: newGroup.userId,
    events: [],
  };
  GROUPS.push(group);
  return group;
}

export async function deleteGroup(groupId) {
  const groupIndex = getGroupIdx(groupId);
  const group = GROUPS[groupIndex];
  GROUPS.splice(groupIndex, 1);
  return group;
}

export async function updateGroup(groupId, name, description) {
  const groupIndex = getGroupIdx(groupId);
  const group = GROUPS[groupIndex];
  group.name = name;
  group.description = description;
  return group;
}

export async function addEventToGroup(groupId, event) {
  const group = await getGroup(groupId);
  group.events.push(event);
  return event;
}

export async function deleteEventFromGroup(groupId, eventId) {
  const groupIndex = getGroupIdx(groupId);
  const eventIdx = getEventIdx(groupIndex, eventId);
  const event = GROUPS[groupIndex].events[eventIdx];
  GROUPS[groupIndex].events.splice(eventIdx, 1);
  return event;
}

// Auxilary functions
function getGroupIdx(groupId) {
  const groupIdx = GROUPS.findIndex((i) => i.id == groupId);
  if (groupIdx != -1) {
    return groupIdx;
  }
  throw errors.GROUP_NOT_FOUND(groupId);
}

function getEventIdx(groupIdx, eventId) {
  const eventIdx = GROUPS[groupIdx].events.findIndex((e) => e.id == eventId);
  if (eventIdx != -1) {
    return eventIdx;
  }
  throw errors.EVENT_NOT_FOUND(groupIdx);
}
