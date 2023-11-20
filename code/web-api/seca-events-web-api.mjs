import errors from "../errors.mjs"

export default function (secaServices) {
    if(!secaServices) {
        throw errors.INVALID_PARAMETER("SECA DATA")
    }

    return {
        getPopularEvents: getPopularEvents
    }

    async function getPopularEvents(req, rsp) {
        try {
            const popular = await secaServices.getPopularEvents()
            rsp.status(200).json(
                {
                    status: "Success - showing the most popular events",
                    popularEvents: popular
                }
            )
        } catch(err) {
            rsp.status(400).json(
                {
                    status: "Failure - failed to get the most popular events"
                }
            )
        }
    }
}
