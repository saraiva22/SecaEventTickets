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
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${keyCarolina}`,
    true
  )
    .then((event) => event[0])
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
  if (details) {
    const eventToPush = getDetails(apiReq, apiReq, details);
    objevents.push(eventToPush);
  } else {
    apiReq["_embedded"]["events"].map((value) => {
      const eventToPush = getDetails(apiReq, value, details);
      objevents.push(eventToPush);
    });
  }
  return objevents;
}

// Auxilary Functions
function getDetails(apiReq, obj, bol) {
  const classifications = obj?.classifications[0];
  const newEvent = {
    id: obj.id,
    name: obj.name,
    date: obj.dates.start.localDate,
    time: obj.dates.start.localTime,
  };
  if (bol) {
    const image = apiReq?.images?.filter(
      (v) => v.ratio == ratioImage && v.width == widthImage
    );
    const imageOriginal = image.size != 0 ? image[0] : undefined;
    newEvent.image = imageOriginal.url;
    newEvent.dateSalesStart = apiReq.sales.public.startDateTime;
    newEvent.dateSalesEnd = apiReq.sales.public.endDateTime;
    newEvent.dateEventEnd = apiReq.dates.start.dateTime;
  }
  newEvent.segment = classifications?.segment?.name;
  newEvent.genre = classifications?.genre?.name;
  newEvent.subGenre = classifications.subGenre.name;
  if(apiReq.url != undefined) newEvent.url = apiReq.url 
  else newEvent.url = obj.url
  return newEvent;
}
