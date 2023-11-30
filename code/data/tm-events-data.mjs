//const keyCarolina = "HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX";
const keyFrancisco =  "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";

export async function getPopularEvents(s,p) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=${s}&page=${p}&apikey=${keyFrancisco}`
  );
}

export async function getSearchedEvents(keyword,s,p) {  
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?keyword=${keyword}&size=${s}&page=${p}&apikey=${keyFrancisco}`
  );
}

export async function getEventById(id){
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?id=${id}&apikey=${keyFrancisco}`
  ).then(event => event[0])
   .catch((err) => {undefined});
}

async function ProcessRequestFromApi(url) {
  return fetch(url)
    .then((resp) => resp.json() )
    .then((rsp) => ObjectEvents(rsp))
    .catch((err) => { undefined });
}

export function ObjectEvents(apiReq) {
  let objevents = [];
  apiReq["_embedded"]["events"].map((value) => {
    const classifications = value.classifications != undefined ? value.classifications[0] : undefined ;
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

