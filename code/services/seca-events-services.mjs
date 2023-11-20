import { readFile, writeFile } from "node:fs/promises";

const keyCarolina = "HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX";
//const keyFrancisco = "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";

const POPULAR_EVENTS = new Array();

export async function getPopularEvents(req, rsp) {
  try {
    let result = await fetch(
      "https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&apikey=" +
        keyCarolina
    );
    let popularEvents = await result.json();
    let listEvents = await popularEvents["_embedded"]["events"].map((value) => {
      const classifications = value.classifications[0];

      POPULAR_EVENTS.push({
        name: value.name,
        date: value.dates.start.localDate,
        time: value.dates.start.localTime,
        segment:
          classifications != undefined
            ? classifications.segment.name
            : undefined,
        genre:
          classifications != undefined ? classifications.genre.name : undefined,
        url: value.url,
      });
    });
    return POPULAR_EVENTS;
  } catch (err) {
    console.log("ERRO");
  }
  return [];
}

export async function getSearchedEvents(req, rsp) {
  try {
    let result = await fetch(
      "https://app.ticketmaster.com/discovery/v2/events/?keyword=Football&apikey=" +
        keyCarolina
    );
    let search = await result.json();
    rsp.status(200).json(JSON.stringify(search, null, 2));
  } catch (err) {
    console.log("Error occurred");
    console.log(err);
  }
}
