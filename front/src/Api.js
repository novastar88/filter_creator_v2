

const apiUrl = "http://127.0.0.1:8000/"

const headerGet = {headers: {"Content-Type": 'application/json'}, method: 'GET', credentials: 'same-origin'}
const headerPut = {headers: {"Content-Type": 'application/json'}, method: 'PUT', credentials: 'same-origin'}


function assemblePutData(body) {
    if (typeof(body) === "object") {
    var base = headerPut
    base['body'] = JSON.stringify(body)
    return base
    } else {
        throw new Error(`body is not an object: ${typeof(body)}`)
    }
  }


export async function makeRequest(type, endpoint, changeFunction, sendData = null, parse = true) {
    switch (type) {
        case 'GET':
            fetch(apiUrl + endpoint, headerGet).then(
                response => response.json()).then(
                    data => { if (parse) {changeFunction(JSON.parse(data))} else {changeFunction(data)}}).catch(
                        error => {changeFunction(error.constructor.name)})
            break
        case 'PUT':
            if (sendData == null) {
                throw new Error("send data is empty")}

            const a = assemblePutData(sendData)
            fetch(apiUrl + endpoint, a, headerPut).then(response => response.json()).then(
                data => { if (parse) {changeFunction(JSON.parse(data))} else {changeFunction(data)}}).catch(
                    error => {changeFunction(error.constructor.name)})          
            break
        default:
            throw new Error(`not valid type of request: ${type}`)
    }
}