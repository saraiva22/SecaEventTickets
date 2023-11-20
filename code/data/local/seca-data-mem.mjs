import errors from "../../errors.mjs";

let groups = [];

let nextId = 0;

export function getAllGroups() {
  return groups;
}

export function createGroup(groupName, groupDescription) {
  const group = {
    id: nextId++,
    name: groupName,
    description: groupDescription,
    events: [],
  }
  groups.push(group)
  return group;
}

export function deleteGroup(groupId) {
  const groupIndex = groups.findIndex(i => i.id == groupId);
  if (groupIndex != -1) {
    groups.splice(groupIndex, 1);
    return groups;
  }
  throw errors.GROUP_NOT_FOUND;
}