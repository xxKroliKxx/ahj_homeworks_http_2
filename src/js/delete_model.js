export default class delete_model {
    constructor(element) {
        this.taskIndex = -1;
        this.callBack = []
        this.element = element
        const buttonCancel = element.getElementsByClassName('task_modal_button_cancel')[0]
        const buttonOK = element.getElementsByClassName('task_modal_button_ok')[0]
        buttonCancel.addEventListener('click', () => this.hide())
        buttonOK.addEventListener('click', () => this.onOKClick())
    }

    addEventOK(callBack) {
        this.callBack.push(callBack)
    }

    show(index) {
        this.taskIndex = index
        this.element.classList.remove('delete_modal_none')
    }

    hide() {
        this.element.classList.add('delete_modal_none')
    }

    onOKClick() {
        this.hide()
        this.callBack.forEach((o) => o.call(null, this.taskIndex));
    }

}