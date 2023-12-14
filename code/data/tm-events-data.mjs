const keyCarolina = "HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX";
//const keyFrancisco = "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";
const ratioImage = "16_9";
const widthImage = "205";

export async function getPopularEvents(s, p) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=${s}&page=${p}&apikey=${keyCarolina}`,
    false
  );
}

export async function getSearchedEvents(keyword, s, p) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?keyword=${keyword}&size=${s}&page=${p}&apikey=${keyCarolina}`,
    false
  );
}

export async function getEventById(id) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/?id=${id}&apikey=${keyCarolina}`,
    false
  )
    .then((event) => event[0])
    .catch(() => {
      undefined;
    });
}

export async function getEventDetails(eventId) {
  return ProcessRequestFromApi(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${keyFrancisco}`,
    true
  )
    .then((event) => event)
    .catch(() => {
      undefined;
    });
}

async function ProcessRequestFromApi(url, details) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((rsp) => ObjectEvents(rsp, details))
    .catch(() => {
      undefined;
    });
}

export function ObjectEvents(apiReq, details) {
  let objevents = [];
  if (details) return getDetails(apiReq, details);
  else {
    apiReq["_embedded"]["events"].map((value) => {
      const eventToPush = getDetails(value, details);
      objevents.push(eventToPush);
    });
  }
  return objevents;
}

// Auxilary Functions
function getDetails(obj, bol) {
  const classifications = obj?.classifications[0];
  const newEvent = {
    id: obj.id,
    name: obj.name,
    date: obj.dates.start.localDate,
    time: obj.dates.start.localTime,
  };
  if (bol) {
    const image = obj?.images?.filter(
      (v) => v.ratio == ratioImage && v.width == widthImage
    );
    const imageOriginal = image.size != 0 ? image[0] : undefined;
    newEvent.image = imageOriginal.url;
    newEvent.dateSalesStart = obj.sales.public.startDateTime;
    newEvent.dateSalesEnd = obj.sales.public.endDateTime;
    newEvent.dateEventEnd = obj.dates.start.dateTime;
  }
  newEvent.segment = classifications?.segment?.name;
  newEvent.genre = classifications?.genre?.name;
  newEvent.subGenre = classifications.subGenre.name;
  newEvent.url = obj.url;
  return newEvent;
}
