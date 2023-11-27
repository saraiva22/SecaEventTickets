import { group } from "console";
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

let nextId = GROUPS.length + 1;

export async function getAllGroups(userId) {
  return Promise.resolve(GROUPS.filter((t) => t.userId == userId));
}

export async function getGroup(groupId) {
  const groupIdx = getGroupIdx(groupId);
  return GROUPS[groupIdx];
}

export async function createGroup(newGroup) {
  console.log(newGroup.name);
  if (existsGroupName(newGroup)) throw errors.EXIST_GROUP_NAME(newGroup.name);
  console.log("DASDSADA")
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
  try {
    const groupIndex = getGroupIdx(groupId);
    const group = GROUPS[groupIndex];
    GROUPS.splice(groupIndex, 1);
    return group;
  } catch (err) {
    console.log(err);
  }
}

export async function updateGroup(groupId, name, description) {
  try {
    const groupIndex = getGroupIdx(groupId);
    const group = GROUPS[groupIndex];
    group.name = name;
    group.description = description;
    return group;
  } catch (err) {
    console.log(err);
  }
}

export async function addEventToGroup(groupId, event) {
  try {
    const group = await getGroup(groupId);
    group.events.push(event);
    return event;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteEventFromGroup(groupId, eventId) {
  try {
    const groupIndex = getGroupIdx(groupId);
    const eventIdx = getEventIdx(groupIndex, eventId);
    const event = GROUPS[groupIndex].events[eventIdx];
    GROUPS[groupIndex].events.splice(eventIdx, 1);
    return event;
  } catch (err) {
    console.log(err);
  }
}

// Auxilary functions
function getGroupIdx(groupId) {
  const groupIdx = GROUPS.findIndex((i) => i.id == groupId);
  if (groupIdx != -1) {
    return groupIdx;
  }
  throw errors.GROUP_NOT_FOUND(groupIdx);
}

function existsGroupName(groupName) {
  const gName = GROUPS.findIndex((n) => n.name == groupName.name);
  return gName != -1;
}

function getEventIdx(groupIdx, eventId) {
  const eventIdx = GROUPS[groupIdx].events.findIndex((e) => e.id == eventId);
  if (eventIdx != -1) {
    return eventIdx;
  }
  throw errors.EVENT_NOT_FOUND(groupIdx);
}
