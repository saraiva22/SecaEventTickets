//const keyCarolina = "HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX";
const keyFrancisco = "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";
const ratioImage = "16_9";
const widthImage = "205";

export async function getPopularEvents(s, p) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=${s}&page=${p}&apikey=${keyFrancisco}`
  );
}

export async function getSearchedEvents(keyword, s, p) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?keyword=${keyword}&size=${s}&page=${p}&apikey=${keyFrancisco}`
  );
}

export async function getEventById(id) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?id=${id}&apikey=${keyFrancisco}`
  )
    .then((event) => event[0])
    .catch(() => {
      undefined;
    });
}

export async function getEventDetails(eventId) {
  return ProcessRequestFromApiByEvent(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${keyFrancisco}`
  );
}

async function ProcessRequestFromApi(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((rsp) => ObjectEvents(rsp))
    .catch(() => {
      undefined;
    });
}

async function ProcessRequestFromApiByEvent(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((rsp) => EventDetails(rsp))
    .catch(() => {
      undefined;
    });
}

export function ObjectEvents(apiReq) {
  let objevents = [];
  apiReq["_embedded"]["events"].map((value) => {
    const classifications =
      value.classifications != undefined ? value.classifications[0] : undefined;
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

export function EventDetails(apiReq) {
  const classifications =
    apiReq.classifications != undefined ? apiReq.classifications[0] : undefined;
  const image = apiReq.images.filter(
    (value) => value.ratio == ratioImage && value.width == widthImage
  );
  const imageOriginal = image.size != 0 ? image[0] : undefined;
  return {
    id: apiReq.id,
    name: apiReq.name,
    id: apiReq.id,
    name: apiReq.name,
    image: imageOriginal.url,
    dateSalesStart: apiReq.sales.public.startDateTime,
    dateSalesEnd: apiReq.sales.public.endDateTime,
    dateEventStart: apiReq.dates.start.localDate,
    timeEventStart: apiReq.dates.start.localTime,
    dateEventEnd: apiReq.dates.start.dateTime,
    segment:
      classifications != undefined ? classifications.segment.name : undefined,
    genre:
      classifications != undefined ? classifications.genre.name : undefined,
    subGenre:
      classifications != undefined ? classifications.subGenre.name : undefined,
    url: apiReq.url,
  };
}
