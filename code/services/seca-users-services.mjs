import errors from "../errors.mjs";

export default function (secaData) {
    if(!secaData) {
        throw errors.INVALID_PARAMETER("SECA DATA")
    }

    return {
        createUser: createUser
    }

    function createUser(username) {
        return secaData.createUser(username)
    }
}