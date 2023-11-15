import { readFile, writeFile } from 'node:fs/promises'

const keyCarolina =  'HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX'
const keyFrancisco = "7SgPqRlqGPcGEgFz5TYT01W1iUZlDFNl";


export async function getPopularEvents(req, rsp) {
    try {
        let result = await fetch("https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&apikey="+keyFrancisco)
        let popularEvents = await result.json()
        //let json = JSON.stringify(popularEvents, null, 2)
        //await writeFile("./outputPopularEvents.json", json)
        rsp.status(200).json(JSON.stringify(popularEvents, null, 2))
    } catch(err) {
        console.log("Error occurred")
        console.log(err)
    }
}



export async function getShearchedEvents(req, rsp) {
    try {
        let result = await fetch("https://app.ticketmaster.com/discovery/v2/events/?keyword=Football&apikey="+keyFrancisco)
        let search = await result.json()
        rsp.status(200).json(JSON.stringify(search, null, 2))
    } catch(err) {
        console.log("Error occurred")
        console.log(err)
    }
}
