import {createTasks} from "./api"

export default class task_model {
    constructor(element) {
        this.id = -1
        this.element = element
        const buttonCancel = element.getElementsByClassName('task_modal_button_cancel')[0]
        const buttonOK = element.getElementsByClassName('task_modal_button_ok')[0]
        buttonCancel.addEventListener('click', () => this.hide())
        buttonOK.addEventListener('click', (e) => this.saveTask(e))
        this.saveTaskCallBack = undefined
    }

    setBoardCallBack(callBack) {
        this.saveTaskCallBack = callBack
    }

    setTitle(Title) {
        const e = this.element.getElementsByClassName('task_modal_title')[0]
        e.innerText = Title
    }

    setData(task) {
        this.id = task.id;
        const task_title = this.element.getElementsByClassName('task_title')[0]
        const task_description = this.element.getElementsByClassName('task_description')[0]
        task_title.value = task.name
        task_description.value = task.description
    }

    show() {
        this.element.classList.remove('task_modal_none')
    }

    hide() {
        this.element.classList.add('task_modal_none')
    }

    saveTask(e) {
        if (this.id === -1) {
            const task_title = this.element.getElementsByClassName('task_title')[0]
            const task_description = this.element.getElementsByClassName('task_description')[0]
            createTasks({
                id: 1,
                name: task_title.value,
                description: task_description.value,
                status: 0,
                created: new Date().toISOString()
            }, this.saveTaskCallBack)
        }
        this.hide()
    }
}