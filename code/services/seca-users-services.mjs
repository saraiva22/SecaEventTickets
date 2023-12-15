import errors from "../common/errors.mjs";

export default function (secaData) {
  if (!secaData) {
    throw errors.INVALID_PARAMETER("SECA DATA");
  }

  return {
    createUser: createUser,
    getUserId: getUserId,
  };

  async function createUser(username) {
    return await secaData.createUser(username);
  }

  function getUserId(token) {
    return secaData.getUserId(token);
  }
}
