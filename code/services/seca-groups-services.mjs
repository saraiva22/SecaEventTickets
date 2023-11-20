import errors from "../errors.mjs";

export default function groupsServices(secaData) {
    if(!secaData) {
        throw errors.INVALID_PARAMETER("SECA DATA")
    }

    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        deleteGroup: deleteGroup
    }

    function getAllGroups() {
        return secaData.getAllGroups()
    }

    function createGroup(groupName, groupDescription) {
        return secaData.createGroup(groupName, groupDescription)
    }

    function deleteGroup(groupId) {
        return secaData.deleteGroup(groupId)
    }
}

