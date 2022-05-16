const fs = require('fs')

const readDataBase = () => {
    const path = './db/data.json'
    if(!fs.existsSync(path)){
        return null
    }
    const info = fs.readFileSync(path, {
        encoding: 'utf-8'
    })
    const data = JSON.parse(info)
    console.log(data)
    return data
}

module.exports = {
    readDataBase
}