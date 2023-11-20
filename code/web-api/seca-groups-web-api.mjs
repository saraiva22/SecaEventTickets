import errors from "../errors.mjs";

export default function groupsApi(secaServices) {
    if(!secaServices) {
        throw errors.INVALID_PARAMETER("SECA DATA")
    }

    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        deleteGroup: deleteGroup
    }

    function getAllGroups(req, rsp) {
        const groups = secaServices.getAllGroups()
        rsp.status(200).json(
            {
                status: "Success - showing all groups",
                groups: groups
            }
        )
    }

    function createGroup(req, rsp) {
        const group = secaServices.createGroup(req.body.name, req.body.description)
        rsp.status(201).json(
            {
                status: "Success - Added new group sucessfully",
                newGroup: group
            }
        )
    }
    
    function deleteGroup(req, rsp) {
        const idGroup = req.params.groupId
        const dlt = secaServices.deleteGroup(idGroup)
        if(!dlt.length) {
            rsp.status(404).json(
                {
                    status: `Failure - Failed to delete group ${idGroup}`
                }
            )
            return
        }
        rsp.status(200).json(
            {
                status: `Success - Deleted group ${idGroup} successfully`,
                groups: dlt
            }
        )
    }
}