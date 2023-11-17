import * as eventServices from './seca-events-services.mjs'

export async function _getPopularEvents(req, rsp) {
    const popularEvents = await eventServices.getPopularEvents(req, rsp)
    //console.log(popularEvents)
    if(popularEvents.length != 0) {
        rsp.status(200).json({
            status: "Success - Popular Events sent",
            popularEvents: popularEvents
        });
    }
    rsp.status(404).json({
        status: "Failure"
    })
}