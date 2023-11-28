import errors from "../errors.mjs";

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    createUser: createUser,
  };

  function createUser(req, rsp) {
    const newUser = secaServices.createUser(req.body.username);
    if (newUser) {
      rsp.status(201).json({
        status: "Success - Added new user sucessfully",
      });
    } else {
      rsp.status(404).json({
        status: `Failure - Failed to create new user`,
      });
    }
  }
}
