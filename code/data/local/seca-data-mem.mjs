import errors from "../../errors.mjs";

let GROUPS = [];

let nextId = 0;

export function getAllGroups() {
  return GROUPS;
}

export function createGroup(groupName, groupDescription) {
  const group = {
    id: nextId++,
    name: groupName,
    description: groupDescription,
    events: [],
  }
  GROUPS.push(group)
  return group;
}

export function deleteGroup(groupId) {
  const groupIndex = GROUPS.findIndex(i => i.id == groupId);
  if (groupIndex != -1) {
    GROUPS.splice(groupIndex, 1);
    return GROUPS;
  }
  throw errors.GROUP_NOT_FOUND;
}