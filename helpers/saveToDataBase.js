const fs = require('fs')
const saveToDataBase = data =>{
    const path = './db/data.json'
    if(data.length <= 0){
        return null
    }
    fs.writeFileSync(path, JSON.stringify(data))
}


module.exports = {
    saveToDataBase
}