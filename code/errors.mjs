export const ERROR_CODES = {
    INVALID_PARAMETER: 1,
    USER_NOT_FOUND: 2,
    GROUP_NOT_FOUND: 3,
    NOT_AUTHORIZDED: 4
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
  NOT_AUTHORIZDED: () => {
    return Error(4, "Not authorized")
  }
};
