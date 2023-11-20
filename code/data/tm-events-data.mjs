
const keyCarolina = "HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX";
//const keyFrancisco = "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";

export async function getPopularEvents() {
    return ProcessRequestFromApi(
        "https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&apikey=" + keyCarolina
    )
}

async function ProcessRequestFromApi(url) {
    return fetch(url)
            .then(resp => resp.json())
            .then(rsp => PopularEvents(rsp))
            .catch(err => processError(err))
}

function PopularEvents(apiReq) {
    let ppevents = []
    apiReq["_embedded"]["events"].map(
        (value) => {
                const classifications = value.classifications[0];
                ppevents.push({
                    name: value.name,
                    date: value.dates.start.localDate,
                    time: value.dates.start.localTime,
                    segment:
                        classifications != undefined? classifications.segment.name: undefined,
                    genre:
                        classifications != undefined ? classifications.genre.name : undefined,
                    url: value.url,
                });
            });
    return ppevents
}

// tem de ser mexido???
function processError(err) {
    console.log("Error occurred")
    console.log(err)
}