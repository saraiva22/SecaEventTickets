import { ERROR_CODES } from "../errors.mjs"

function HttpResponse(status, e) {
    this.status = status
    this.body = {
        code: e.code,
        error: e.description
    }
}

export default function(error) {
    switch(error.code) {
        case ERROR_CODES.INVALID_PARAMETER: return new HttpResponse(400, error)
        case ERROR_CODES.USER_NOT_FOUND: return new HttpResponse(401, error)
        case ERROR_CODES.GROUP_NOT_FOUND: return new HttpResponse(401, error)
        case ERROR_CODES.NOT_AUTHORIZED: return new HttpResponse(401, error)
        case ERROR_CODES.EXIST_GROUP_NAME: return new HttpResponse(400, error)
        default: return new HttpResponse(500, "Internal server error")
    }
}