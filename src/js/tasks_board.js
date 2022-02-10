import Task from './ticket'
import {getTasks} from "./api"

export default class tasksBoard {
    constructor(board, taskModel, deleteModal) {
        this.board = board
        this.tasks = []
        this.taskModel = taskModel
        this.deleteModal = deleteModal
        this.deleteModal.addEventOK(this.deleteTask.bind(this))

        const buttonAdd = board.getElementsByClassName('button_add')[0]
        buttonAdd.addEventListener('click', () => this.createTask())
    }

    getTask() {
        getTasks(this)
    }

    displayTasks(tasksInfo) {
        if (this.tasks.length !== 0) {
            for (const task of this.tasks) {
                task.element.remove()
            }
            this.tasks = []
        }

        for (const taskInfo of tasksInfo) {
            this.addTask(taskInfo)
        }
    }

    addTask(taskInfo) {
        const task = new Task()
        task.createTask(taskInfo, this.taskClick.bind(this))
        this.board.appendChild(task.element)
        this.tasks.push(task)

        const buttonEdit = task.element.getElementsByClassName('button_edit')[0]
        const buttonDelete = task.element.getElementsByClassName('button_delete')[0]
        buttonEdit.addEventListener('click', (e) => this.buttonEditClick(e))
        buttonDelete.addEventListener('click', (e) => this.buttonDeleteClick(e))
    }

    taskClick(e, id) {
        const task = this.tasks.find(element => element.id === id)
        if (e.target === task.taskBody) {
            task.descriptionVisibility()
        }
    }

    buttonDeleteClick(e) {
        const taskElement = e.target.closest('.task')
        const index = this.tasks.findIndex(element => element.id === Number(taskElement.dataset.ID))
        this.deleteModal.show(index)
    }

    buttonEditClick(e) {
        const taskElement = e.target.closest('.task')
        const index = this.tasks.findIndex(element => element.id === Number(taskElement.dataset.ID))
        const task = this.tasks[index]
        this.taskModel.setTitle("Изменить тикет")
        this.taskModel.setData(task.info)
        this.taskModel.show()
    }

    deleteTask(taskIndex) {
        this.tasks[taskIndex].element.remove()
        this.tasks.splice(taskIndex, 1)
    }

    createTask() {
        this.taskModel.setTitle("Добавить тикет")
        this.taskModel.setData({id: -1, name: "", description: ""})
        this.taskModel.show()
    }

}