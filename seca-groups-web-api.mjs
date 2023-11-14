import * as groupServices from './seca-groups-services.mjs'

export function createGroup(req, rsp) {
    const group = {
        id: nextId++,
        name: req.body.name,
        description: req.body.description
    }

    groupServices.GROUPS.push(group.id = nextId++)
    rsp.status(201).json(group)
}