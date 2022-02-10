
const url = 'https://ahj-homeworks-http-1.herokuapp.com/v1/'

export function getTasks(taskBoard){
    const xhr = new XMLHttpRequest();
    const _url = url + 'tickets'
    xhr.open('GET', _url, true);
    xhr.addEventListener('load', () => {
        if (xhr.status !== 200) {
           return
        }
        taskBoard.displayTasks(JSON.parse(xhr.response));
    });
    xhr.send();
}

export function createTasks(task, callBack){
    const xhr = new XMLHttpRequest();
    const _url = url + 'tickets'
    xhr.open('POST', _url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
        if (xhr.status !== 200) {
            return
        }
        callBack()
    });

    xhr.send(JSON.stringify(task))
}