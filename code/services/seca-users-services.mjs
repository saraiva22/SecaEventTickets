
const USERS = new Array()

let nextIdp = USERS.length+1

export function addUser(username){
    if(!USERS.find(u => u.name == username)) {
        const user = {
            id: nextIdp++,
            name: username,
            token: crypto.randomUUID()
        }

        USERS.push(user)
        return true
    } 
    return false
}