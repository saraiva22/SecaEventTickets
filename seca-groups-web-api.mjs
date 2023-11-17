import * as groupServices from './seca-groups-services.mjs'

export function _getAllGroups(req, rsp) {
    const groups = groupServices.getAllGroups(req, rsp)
    rsp.status(200).json(
        {
            status: "Success - showing all groups",
            groups: groups
        }
    )
}

export function _createGroup(req, rsp) {
    const group = groupServices.createGroup(req, rsp)
    rsp.status(201).json(
        {
            status: "Success - Added new group sucessfully",
            newGroup: group
        }
    )
}

export function _deleteGroup(req, rsp) {
    const dlt = groupServices.deleteGroup(req, rsp)
    if(!dlt.length) {
        rsp.status(404).json(
            {
                status: `Failure - Failed to delete group ${req.params.groupId}`
            }
        )
    }
    rsp.status(200).json(
        {
            status: `Success - Deleted group ${req.params.groupId} successfully`,
            groups: dlt
        }
    )
}