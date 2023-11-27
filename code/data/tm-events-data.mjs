//const keyCarolina = "HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX";
const keyFrancisco =  "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";

export async function getPopularEvents() {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&apikey=${keyFrancisco}`
  );
}

export async function getSearchedEvents(keyword) {  
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?keyword=${keyword}&apikey=${keyFrancisco}`
  );
}

export async function getEventById(id){
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?id=${id}&apikey=${keyFrancisco}`
  ).then(event => event[0]);
}

async function ProcessRequestFromApi(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((rsp) => ObjectEvents(rsp))
    .catch((err) => processError(err));
}

function ObjectEvents(apiReq) {
  let objevents = [];
  apiReq["_embedded"]["events"].map((value) => {
    const classifications = value.classifications[0];
    objevents.push({
      id: value.id,
      name: value.name,
      date: value.dates.start.localDate,
      time: value.dates.start.localTime,
      segment:
        classifications != undefined ? classifications.segment.name : undefined,
      genre:
        classifications != undefined ? classifications.genre.name : undefined,
      url: value.url,
    });
  });
  return objevents;
}

// tem de ser mexido???
function processError(err) {
  console.log(`Error occurred ${err}`);
}
