
const GROUPS = new Array

let nextId = GROUPS.length + 1

export function createGroup(req, rsp) {
    const group = {
        id: nextId++,
        name: req.body.name,
        description: req.body.description
    }

    GROUPS.push(group)
    rsp.status(201).json(group)
}

