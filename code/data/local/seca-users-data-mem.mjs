import crypto from "crypto";
import errors from "../../../common/errors.mjs";

const USERS = [
  {
    id: 0,
    name: "Carolina",
    token: "14d72b99-48f6-48d3-94d3-5a4dcfd96c80",
  },
  {
    id: 1,
    name: "Francisco",
    token: "14d72b99-48f6-48d3-94d3-5a4dcfd96c81",
  },
];

let nextId = USERS.length;

export function createUser(username) {
  if (!USERS.find((u) => u.name == username)) {
    const user = {
      id: nextId++,
      name: username,
      token: crypto.randomUUID(),
    };
    USERS.push(user);
    return user;
  }
  throw errors.USER_EXISTS(username);
}

export function getUserId(userToken) {
  const user = USERS.find((u) => {
    return u.token == userToken;
  });
  if (user) {
    return user.id;
  }
  throw errors.USER_NOT_FOUND();
}
