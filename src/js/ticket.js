export default class task {
    constructor() {
        this.element = undefined;
        this.info = undefined
        this.id = -1;
        this.description = undefined
        this.taskBody = undefined
        this.description = undefined
    }

    createTask(info, taskClick) {
        const formatter = new Intl.DateTimeFormat("ru", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

        this.info = info
        this.id = info.id
        const task = document.createElement('div')
        task.dataset.ID = info.id;
        task.classList.add('task')
        task.innerHTML = `
        <div class="task_body">
            <div class="task_left">
                <div class="mark"></div>
                <span class="title"> ${info.name}  </span>
            </div>
            <div class="task_right">
                <span class="date"> ${formatter.format(new Date(info.created)).replace(',', "")}  </span>
                <button class="button_edit button"> &#x270E;</button>
                <button class="button_delete button"> х</button>
            </div>
        </div>
        <div class="description description_none">
            <span>
                ${info.description}
            </span>
        </div>`

        if (info.status === 1) {
            const mark = task.getElementsByClassName('mark')[0]
            mark.classList.add('mark_done')
        }

        this.description = task.getElementsByClassName('description')[0]
        this.taskBody = task.getElementsByClassName('task_body')[0]
        this.taskBody.addEventListener('click', (e) => taskClick(e, info.id))
        this.element = task
    }

    descriptionVisibility() {
        this.description.classList.toggle('description_none')
    }

}

