export function getHome(req, rsp) {
  if (req.user != undefined) {
    rsp.render("home", { logout: true });
  } else {
    rsp.render("home", { login: true });
  }
}
