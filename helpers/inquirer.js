const inquirer = require('inquirer')
require('colors')

const inputs = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?\n',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea`
            },{
                value: '2',
                name: `${'2'.green}. Listar tarea`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tareas`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tareas`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            }
        ]
    }
]


const inquirerMenu = async () => {
    console.clear()
    console.log('============================================='.green)
    console.log('           Seleccione una opcion       '.white.bgBlack);
    console.log('=============================================\n'.green)

    const {option} = await inquirer.prompt(inputs)

    return option
}

const input = [{
    type: 'input',
    name: 'pause',
    message: `presione ${'ENTER'.green} para continuar`,
}]

const pause = async () => {
    console.log('\n')
    const {pause} = await inquirer.prompt(input)
}


const readInput = async ( message ) => {
    const question = [{
        type: 'input',
        name: 'description',
        message,
        validate( value ){
            if(value.length === 0){
                return 'Por favor, ingrese un valorr'
            }
            return true
        }
    }]

    const {description} = await inquirer.prompt(question)
    return description
    
}

const listTasksDelete = async (tareas = []) => {
    const choices = tareas.map((task, index)=>(
        {
            value: task.id,
            name: `${`${index + 1}`.green}. ${task.description}`
        }
    ))
    
    choices.unshift({
        value: '0',
        name: `${'0'.green}. Cancelar`
    })

    const question = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione la tarea a borrar\n',
        choices
    }]
    const { id } = await inquirer.prompt(question)
    return id
}

const confirme = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'confirm',
        message
    }]
    const { confirm } = await inquirer.prompt(question)
    return confirm
}

const showListCheck = async (tareas = []) => {
    const choices = tareas.map((task, index)=>(
        {
            value: task.id,
            name: `${`${index + 1}`.green}. ${task.description}`,
            checked: task.completedIn ? true : false
        }
    ))
    

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione la tarea(s) a completar\n',
        choices
    }]
    const { ids } = await inquirer.prompt(question)
    return ids
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirme,
    showListCheck
}