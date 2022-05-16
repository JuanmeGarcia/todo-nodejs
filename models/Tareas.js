const Tarea = require('./tarea')

class Tareas {
	_listado = {}

	constructor() {
		this._listado = {}
	}

	createTask(description = '') {
		const tarea = new Tarea(description)
		this._listado[tarea.id] = tarea
	}

	loadTasksFromArray(tasks = []) {
		tasks.forEach(task => {
			this._listado[task.id] = task
		})
	}

	get viewList() {
		const list = []

		Object.keys(this._listado).forEach(key => {
			const task = this._listado[key]
			list.push(task)
		})

		return list
	}

	completedList() {
		const newArray = this.viewList.map(
			(task, index) =>
				`${
					task.completedIn ? `${index + 1}`.green : `${index + 1}`.red
				} ${task.description} :: ${
					task.completedIn ? 'Completada'.green : 'Pendiente'.red
				}`
		)
		return newArray
	}
	listCompleted() {
		const newArray = this.viewList
			.filter((task) => task.completedIn)
			.map(
				(task, index) =>
					`${`${index + 1}`.green} ${task.description} :: ${`${task.completedIn}`.green}`
			)
		return newArray
	}

	listPending() {
		const newArray = this.viewList
            .filter((task) => !task.completedIn)
            .map((task, index) => `${`${index + 1}`.red} ${task.description} :: ${`${task.completedIn}`.red}`)
		return newArray
	}

    deleteTask(id = ''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleCompleteTasks(ids = []){
        ids.forEach(id =>{
            const task = this._listado[id]
            if(!task.completedIn){
                task.completedIn = new Date().toISOString()
            }
        })
        this.viewList.forEach(task=>{
            if(!ids.includes(task.id)){
                this._listado[task.id].completedIn = null
            }
        })
    }
}

module.exports = Tareas
