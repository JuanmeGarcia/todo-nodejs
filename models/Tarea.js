const  { v4: uuid } = require('uuid')

class Tarea {
    id = ''
    description = ''
    completedIn = null

    constructor(description) {
        this.id = uuid()
        this.description = description
        this.completedIn = null
    }

    get description(){
        return this.description
    }

}

module.exports = Tarea