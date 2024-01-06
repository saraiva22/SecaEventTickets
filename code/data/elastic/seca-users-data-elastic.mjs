import { get, post, del, put } from "./utils/fetch-wrapper.mjs";
import crypto from "crypto";
import uriManager from "./utils/uri-manager-elastic.mjs";
import errors from "../../common/errors.mjs";

const INDEX_NAME = "users";
const URI_MANAGER = await uriManager(INDEX_NAME);

export async function createUser(username, email, password) {
  const checkUser = await getUserByUsername(username);
  if (checkUser == undefined) {
    const user = {
      username: username,
      email: email,
      password: password,
      token: crypto.randomUUID(),
    };

    return await post(URI_MANAGER.createDoc(), user).then((body) => {
      return user;
    });
  }
  throw errors.USER_EXISTS(username);
}

export async function getUserByUsername(username) {
  const user = await getUserBy("username", username);
  return user[0];
}

async function getUserByToken(token) {
  return await getUserBy("token", token);
}

export async function getUserId(token) {
  const user = await getUserByToken(token);
  const arg = Array.from(user)[0];
  if (arg.token == token) {
    return arg.id;
  }
  throw errors.USER_NOT_FOUND();
}

export async function getUserBy(propName, value) {
  const uri = `${URI_MANAGER.searchDocs()}?q=${propName}:${value}`;
  return await get(uri).then((body) => body.hits.hits.map(createUserFrom));
}

function createUserFrom(groupElastic) {
  let user = Object.assign({ id: groupElastic._id }, groupElastic._source);
  return user;
}
