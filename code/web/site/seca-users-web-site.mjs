import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  return {
    validateLogin: validateLogin,
    verifyAuthenticated: verifyAuthenticated,
    logout: logout,
    userForm: userForm,
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

  async function validateLogin(req, rsp) {
    const valid = await validateUser(req.body.username, req.body.password);
    if (valid) {
      const user = {
        username: req.body.username,
        password: req.body.password,
      };
      req.login(user, () => rsp.redirect("/site/home"));
    } else {
      rsp.redirect("/site/login");
    }
  }

  async function validateUser(username, password) {
    const exists = await secaServices.getUserByUsername(username);
    if (exists != undefined) return true;
    else return false;
  }

  function verifyAuthenticated(req, rsp, next) {
    console.log("verifyAuthenticated", req.user);
    if (req.user) {
      return next();
    }
    rsp.redirect("/site/login");
  }

  function logout(req, rsp) {
    req.logout((err) => {
      rsp.redirect("/site/home");
    });
  }

  function userForm(req, rsp) {
    console.log(req.originalUrl);
    if (req.originalUrl.includes("login")) {
      rsp.render("login", { login: true });
    } else {
      rsp.render("login", { signup: true });
    }
  }

  async function createUser(req, rsp) {
    const newUser = await secaServices.createUser(req.body.username);
    rsp.redirect("/site/home");
  }
}
