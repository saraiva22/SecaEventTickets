import { readFile, writeFile } from 'node:fs/promises'

let key =  'HV0SEcncD1AbMPARE2lOJZqdsVg3pXiX'

export async function getPopularEvents(req, rsp) {
    try {
        let result = await fetch(`https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&apikey=${key}`)
        let popularEvents = await result.json()
        //let json = JSON.stringify(popularEvents, null, 2)
        //await writeFile("./outputPopularEvents.json", json)
        rsp.status(200).json(JSON.stringify(popularEvents, null, 2))
    } catch(err) {
        console.log("Error occurred")
        console.log(err)
    }
}

