// Module manages application users data.
// In this specific module, data is stored ElasticSearch

import { get, post, del, put } from "./utils/fetch-wrapper.mjs";
import uriManager from "./utils/uri-manager-elastic.mjs";

const INDEX_NAME = "users";
const URI_MANAGER = await uriManager(INDEX_NAME);

// Create the index unconditionally. If the index already exists, nothing happiness

export function createUser(username) {
  return getUserBy("username", username);
}

export function getUserId(userToken) {
  return getUserBy("token", userToken);
}

async function getUserByToken(token) {
  return getUserBy("token", token);
}

async function getUserByUsername(username) {
  return getUserBy("username", username);
}

async function getUserBy(propName, value) {
  const uri = `${URI_MANAGER.searchDocs()}?q=${propName}:${value}`;
  return get(uri).then((body) => body.hits.hits.map(createUserFrom));
}

function createUserFrom(groupElastic) {
  let user = Object.assign({ id: groupElastic._id }, groupElastic._source);
  return user;
}
