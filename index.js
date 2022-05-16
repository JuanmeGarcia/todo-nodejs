require('colors')
const { inquirerMenu, pause, readInput, listTasksDelete, confirme, showListCheck } = require('./helpers/inquirer')

const Tareas = require('./models/Tareas')
const { saveToDataBase } = require('./helpers/saveToDataBase')
const { readDataBase } = require('./helpers/readDataBase')

console.clear()

const main = async () => {
	let option = ''
	const tareas = new Tareas()

	const readDB = readDataBase()
	if (readDB) {
		tareas.loadTasksFromArray(readDB)
	}

	await pause()

	do {
		// imprimir menu
		option = await inquirerMenu()

		switch (option) {
			case '1':
				const description = await readInput('Descripcion: \n')
				tareas.createTask(description)
				break
			case '2':
				// tareas.viewList.forEach(task =>{
				//     console.log(task.description)
				// })
				console.log('\n')
				tareas.completedList().forEach(task => {
					console.log(task)
				})
				break
			case '3':
                console.log('\n')
				tareas.listCompleted().forEach(task => console.log(task))
				break
			case '4':
                console.log('\n')
                tareas.listPending().forEach(task => console.log(task))
				break
			case '5':
                    const ids = await showListCheck( tareas.viewList )
                    tareas.toggleCompleteTasks(ids)
                    console.log(ids)
				break
			case '6':
                const id = await listTasksDelete(tareas.viewList)
                if(id !== '0'){
                    const confirm = await confirme(`Esta seguro de borrar la tarea?`)
                    if(confirm){
                        tareas.deleteTask(id)
                        console.log(`Tarea borrada con exito`)
                    }
                }
				break
		}
		saveToDataBase(tareas.viewList)

		option !== '0' && (await pause())
	} while (option !== '0')
}

main()
