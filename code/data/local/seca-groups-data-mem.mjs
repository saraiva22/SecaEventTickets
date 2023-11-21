import errors from "../../errors.mjs";

const NUM_GROUPS = 5

let GROUPS = new Array(NUM_GROUPS)
                .fill(0).map((v, idx) => { 
                    return { 
                        id: idx, 
                        name: `Group ${idx}`, 
                        description: `Group ${idx} description`,
                        userId: idx % 2
                    }
                })

let nextId = GROUPS.length + 1;

export async function getAllGroups(userId) {
  return Promise.resolve(GROUPS.filter(t => t.userId == userId))
}

export async function getGroup(groupId) {
  const groupIdx = getGroupIdx(groupId)
  return GROUPS[groupIdx]
}

export async function createGroup(newGroup) {
  const group = {
    id: nextId++,
    name: newGroup.groupName,
    description: newGroup.groupDescription,
    userId: newGroup.userId,
    events: [],
  }
  GROUPS.push(group)
  console.log(3)
  return group;
}

export async function deleteGroup(groupId) {
  const groupIndex = getGroupIdx(groupId)
  const group = GROUPS[groupIndex]
  GROUPS.splice(groupIndex, 1)
  return group
}

// Auxilary functions
function getGroupIdx(groupId) {
  const groupIdx = GROUPS.findIndex(i => i.id == groupId);
  if (groupIdx != -1) {
    return groupIdx
  }
  throw errors.GROUP_NOT_FOUND(groupIdx);
}