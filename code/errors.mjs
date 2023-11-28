export const ERROR_CODES = {
  INVALID_PARAMETER: 1,
  USER_NOT_FOUND: 2,
  GROUP_NOT_FOUND: 3,
  NOT_AUTHORIZED: 4,
  EVENT_EXISTS: 5,
  EVENT_NOT_FOUND: 6,
};

function Error(code, description) {
  this.code = code;
  this.description = description;
}

export default {
  INVALID_PARAMETER: (argName) => {
    return new Error(1, `Invalid Argument ${argName}`);
  },
  USER_NOT_FOUND: () => {
    return new Error(2, `User Not Found`);
  },
  GROUP_NOT_FOUND: (idGroup) => {
    return new Error(3, `Group ${idGroup} not found`);
  },
  NOT_AUTHORIZED: () => {
    return new Error(4, "Not authorized");
  },
  EVENT_EXISTS: (idEvents) => {
    return new Error(5, `Event with id ${idEvents} already exists`);
  },
  EVENT_NOT_FOUND: (eventId) => {
    return new Error(6, `Event with id ${eventId} not found`);
  },
};
