export default function () {
  return {
    validateLogin: validateLogin,
    verifyAuthenticated: verifyAuthenticated,
    logout: logout,
  };

  function validateLogin(req, rsp) {
    console.log("validateLogin");
    if (validateUser(req.body.username, req.body.password)) {
      const user = {
        username: req.body.username,
        dummy: "dummy property on user",
      };
      console.log(user);
      req.login(user, () => rsp.redirect("/auth/home"));
    }

    function validateUser(username, password) {
      return true;
    }
  }

  function verifyAuthenticated(req, rsp, next) {
    console.log("verifyAuthenticated", req.user);
    if (req.user) {
      return next();
    }
    rsp.redirect("/login");
  }

  function logout(req, rsp) {
    req.logout((err) => {
      rsp.redirect("/home");
    });
  }
}
