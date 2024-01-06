import express from "express";
import passport from "passport";
import expressSession from "express-session";
import errors from "../../common/errors.mjs";
import errorToHttp from "../errors-to-http-responses.mjs";

export default function (secaServices) {
  if (!secaServices) {
    throw errors.INVALID_PARAMETER("SECA SERVICES");
  }

  
  const app = express.Router();

  app.use(
    expressSession({
      secret: "ISEL SECA",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Passport initialization
  app.use(passport.session());
  app.use(passport.initialize());

  passport.serializeUser(serializeUserDeserializeUser);
  passport.deserializeUser(serializeUserDeserializeUser);

  app.use("/auth", verifyAuthenticated);
  app.get("/home", homeNotAuthenticated);
  app.get("/auth/home", homeAuthenticated);

  app.get("/login", loginForm);
  app.post("/login", validateLogin);
  // app.get("/register", registrationForm);
  // app.post("/register", createUser);
  app.post("/logout", logout);



  return app;


  function homeNotAuthenticated(req, rsp) {
    let user = req.user ? req.user.username : "unknown";
    rsp.end(`Everybody can reach  this endpoint. Hello ${user}`);
  }

  function homeAuthenticated(req, rsp) {
    console.log("homeAuthenticated - ", req.user);
    rsp.send(`
    <html>
    <head></head>
    <body>
      <h1>You can only reach here if you are authenticated. Hello ${req.user.username}</h1>
      <form method="POST" action="/logout">
          <input type="submit" value="Logout">
      </form>
  
    </body>
  </html>`);
  }

  function serializeUserDeserializeUser(user, done) {
    done(null, user);
  }

  function serializeUser(user, done) {
    console.log("serializeUserCalled");
    console.log(user);
    //done(null, user.username)
    done(null, user);
  }

  function deserializeUser(user, done) {
    console.log("deserializeUserCalled");
    console.log(user);
    done(null, user);
    // done(null, {
    //   username: user,
    //   dummy: "dummy property on user"
    // })
  }

  function loginForm(req, rsp) {
    rsp.send(`
    <html>
      <head></head>
      <body>
        <h1>Login</h1>
        <form method="POST" action="/login">
            <p>
            Username: <input type="text" name="username" value="">
            </p>
  
            <p>
            Password: <input type="password" name="password">
            </p>
  
            <input type="submit">
        </form>
  
      </body>
    </html>
    `)
  
  }

  async function createUser(req, rsp) {
    const username = req.body.username;
    const password = req.body.password;
    const passConfirm = req.body.password;
    try {
      await secaServices.createUser(username);
    } catch (e) {}
  }

  async function validateLogin(req, rsp) {
    console.log("validateLogin");
    const user = await validateUser(req.body.username, req.body.password);
    if (user) {
      req.login({ username: user.username, token: user.token }, () =>
        rsp.redirect("/auth/home")
      );
    } else {
      rsp.redirect("/login");
    }

    function validateUser(username, password) { return true }
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
