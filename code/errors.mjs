export const ERROR_CODES = {
    INVALID_PARAMETER: 1,
    USER_NOT_FOUND: 2,
    GROUP_NOT_FOUND: 3,
    NOT_AUTHORIZED: 4,
    EVENTS_EXISTING: 5
}

function Error(code, description) {
    this.code = code
    this.description = description
}

export default {
  INVALID_PARAMETER: (argName) => {
    return new Error(1, `Invalid Argument ${argName}`)
  },
  USER_NOT_FOUND: () => {
    return new Error(2, `User Not Found`)
  },
  GROUP_NOT_FOUND: (idGroup) => {
    return Error(3, `Group not found ${idGroup}`)
  },
  NOT_AUTHORIZED: () => {
    return Error(4, "Not authorized")
  },
  EVENTS_EXISTING: (idEvents) => {
    return Error(5, `Eventns is existing ${idEvents}`)
  }
};
