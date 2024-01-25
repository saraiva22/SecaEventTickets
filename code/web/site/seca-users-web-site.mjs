import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";
import bcrypt from "bcrypt";

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
        rsp.status(rspError.status).render("errors", rspError.body);
      }
    };
  }

  async function validateLogin(req, rsp) {
    const username = req.body.username
    const password = req.body.password
    const valid = await validateUser(username, password);
    if (valid) {
      const user = {
        username: username,
        password: password,
      };
      req.login(user, () => rsp.redirect("/site/home"));
    } else {
      rsp.redirect("/site/login");
    }
  }

  async function validateUser(username, password) {
    const user = await secaServices.getUserByUsername(username);
    if (user == null) {
      throw errors.USER_NOT_FOUND;
    }
    if (await bcrypt.compare(password, user.password)) {
      return true;
    }
    return false;
  }

  function verifyAuthenticated(req, rsp, next) {
    if (req.user) {
      return next();
    }
    rsp.redirect("/site/login");
  }

  function logout(req, rsp) {
    rsp.clearCookie("connect.sid");
    req.logout(function (err) {
      req.session.destroy(function (err) {
        rsp.redirect("/site/home");
      });
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
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const checkpass = req.body.confpassword;
    if (password == checkpass) {
      await secaServices.createUser(username, email, password);
      validateLogin(req, rsp);
    } else {
      rsp.redirect("/site/signup");
    }
  }
}
