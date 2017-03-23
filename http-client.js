const { get }= require('http')
//giving url a variable name
const url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}`

//making api call
get( url, (res) => {
    const statusCode = res.statusCode
    const contentType = res.headers['content-type']

//defining error
    let error
    if (statusCode !== 200) {
        error = new Error(`Request failed.\n` +
                          `Status Code: ${statusCode}`)
    // }   else if(!/^application\/json/.test(contentType)) {
        // error = new Error(`Invalid content-type.\n` +
                           // `Expected application/json but received ${contentType}`)
    }
    if (error) {
        console.log(error.message)
        res.resume()
        return
    }

//getting and return data
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData)
            console.log(parsedData)
        }   catch(e) {
            console.log(e.message)
        }
    })

  }) .on('error', (e) => {
        console.log(`Got error: ${e.message}`)
})