import errors from "../common/errors.mjs";
import bcrypt from "bcrypt";

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
    const codedPassword = await bcrypt.hash(password, 15);
    return await secaData.createUser(username, email, codedPassword);
  }

  function getUserId(token) {
    return secaData.getUserId(token);
  }

  async function getUserByUsername(username) {
    return await secaData.getUserByUsername(username);
  }
}
