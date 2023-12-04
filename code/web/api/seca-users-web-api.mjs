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

  function createUser(req, rsp) {
    const newUser = secaServices.createUser(req.body.username);
    rsp.status(201).json({
      status: "Success - Added new user sucessfully",
      newUser: newUser,
    });
  }
}
