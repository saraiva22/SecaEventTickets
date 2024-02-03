import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    createUser: processRequest(createUser),
  };

  function processRequest(reqProcessor) {
    return async function (req, rsp) {
      try {
        return await reqProcessor(req, rsp);
      } catch (e) {
        const rspError = errorToHttp(e);
        rsp.status(rspError.status).json(rspError.body);
      }
    };
  }

  async function createUser(req, rsp) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const checkpass = req.body.confpassword;
    if (password == checkpass) {
      const newUser = await secaServices.createUser(username, email, password);
      rsp.status(201).json({
        status: "Success - Added new user sucessfully",
        newUser: newUser,
      });
    } else {
      rsp.status(400).json({ error: `The user data is invalid` });
      return;
    }
  }
}
