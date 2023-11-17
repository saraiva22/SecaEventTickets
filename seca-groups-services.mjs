
const GROUPS = new Array()

let nextId = GROUPS.length + 1

export function getAllGroups(req, rsp) {
    return GROUPS
}

export function createGroup(req, rsp) {
    const group = {
        id: nextId++,
        name: req.body.name,
        description: req.body.description,
        events: []
    }
    GROUPS.push(group)
    return group
}

export function deleteGroup(req, rsp) {
    const id = req.params.groupId
    const groupIndex = GROUPS.findIndex(i => i.id == id)
    if(groupIndex != -1) {
        GROUPS.splice(groupIndex,1)
        return GROUPS
    }
    return []
}