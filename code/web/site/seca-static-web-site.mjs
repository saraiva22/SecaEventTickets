export function getHome(req, rsp) {
  rsp.sendFile("./public/home.html", { root: "./code/web/site/" });
}
