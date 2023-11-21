import errors from "../errors.mjs";

export default function (secaGroupsData, secaUsersData) {
    if(!secaGroupsData) {
        throw errors.INVALID_PARAMETER("GROUPS DATA")
    }
    if(!secaUsersData) {
        throw errors.INVALID_PARAMETER("USERS DATA")
    }

    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        deleteGroup: deleteGroup
    }

    async function getAllGroups(userToken) {
        const userId = await secaUsersData.getUserId(userToken)
        return await secaGroupsData.getAllGroups(userId)
    }

    async function createGroup(groupName, groupDescription, userToken) {
        const userId = await secaUsersData.getUserId(userToken)
        console.log(2)
        const group = {
            name: groupName,
            description: groupDescription,
            userId: userId
        }
        return await secaGroupsData.createGroup(group)
    }

    async function deleteGroup(groupId, userToken) {
        const userId = await secaUsersData.getUserId(userToken)
        const group = await getGroup(groupId, userId) 
        return await secaGroupsData.deleteGroup(groupId)
    }

    // Auxilry Functions
    async function getGroup(groupId, userId) {
        if(isNaN(Number(groupId))) {
            throw errors.INVALID_ARGUMENT("groupId")
        }
        const group = await secaGroupsData.getGroup(groupId)
        if(group.userId == userId)
            return group
        throw errors.NOT_AUTHORIZED(`User ${userId}`, `Group with id ${groupId}`)
    }
}

