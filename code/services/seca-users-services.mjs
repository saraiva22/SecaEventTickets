import errors from "../common/errors.mjs";

export default function (secaData) {
  if (!secaData) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    createUser: createUser,
    getUserId: getUserId,
    getUserByUsername: getUserByUsername,
  };

  async function createUser(username, email, password) {
    return await secaData.createUser(username, email, password);
  }

  function getUserId(token) {
    return secaData.getUserId(token);
  }

  async function getUserByUsername(username) {
    return await secaData.getUserByUsername(username);
  }
}
