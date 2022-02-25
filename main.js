(()=>{"use strict";class t{constructor(){this.element=void 0,this.info=void 0,this.id=-1,this.description=void 0,this.taskBody=void 0,this.description=void 0}createTask(t,s){const e=new Intl.DateTimeFormat("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"});this.info=t,this.id=t.id;const a=document.createElement("div");a.dataset.ID=t.id,a.classList.add("task"),a.innerHTML=`\n        <div class="task_body">\n            <div class="task_left">\n                <div class="mark"></div>\n                <span class="title"> ${t.name}  </span>\n            </div>\n            <div class="task_right">\n                <span class="date"> ${e.format(new Date(t.created)).replace(",","")}  </span>\n                <button class="button_edit button"> &#x270E;</button>\n                <button class="button_delete button"> х</button>\n            </div>\n        </div>\n        <div class="description description_none">\n            <span>\n                ${t.description}\n            </span>\n        </div>`;const i=a.getElementsByClassName("mark")[0];1===t.status&&i.classList.add("mark_done"),this.description=a.getElementsByClassName("description")[0],this.taskBody=a.getElementsByClassName("task_body")[0],i.addEventListener("click",(()=>this.markClick())),this.element=a,a.getElementsByClassName("title")[0].addEventListener("click",(e=>s(e,t.id)))}descriptionVisibility(){this.description.classList.toggle("description_none")}markClick(){this.taskBody.getElementsByClassName("mark")[0].classList.toggle("mark_done"),this.info.status=!this.info.status}}const s=document.getElementsByClassName("board")[0],e=document.getElementsByClassName("task_modal")[0],a=document.getElementsByClassName("delete_modal")[0],i=new class{constructor(t){this.id=-1,this.element=t;const s=t.getElementsByClassName("task_modal_button_cancel")[0],e=t.getElementsByClassName("task_modal_button_ok")[0];s.addEventListener("click",(()=>this.hide())),e.addEventListener("click",(t=>this.saveTask(t))),this.saveTaskCallBack=void 0}setBoardCallBack(t){this.saveTaskCallBack=t}setTitle(t){this.element.getElementsByClassName("task_modal_title")[0].innerText=t}setData(t){this.id=t.id;const s=this.element.getElementsByClassName("task_title")[0],e=this.element.getElementsByClassName("task_description")[0];s.value=t.name,e.value=t.description}show(){this.element.classList.remove("task_modal_none")}hide(){this.element.classList.add("task_modal_none")}saveTask(t){if(-1===this.id){const t=this.element.getElementsByClassName("task_title")[0],s=this.element.getElementsByClassName("task_description")[0];!function(t,s){const e=new XMLHttpRequest;e.open("POST","https://ahj-homeworks-http-1.herokuapp.com/v1/tickets",!0),e.setRequestHeader("Content-Type","application/json"),e.addEventListener("load",(()=>{200===e.status&&s()})),e.send(JSON.stringify(t))}({id:1,name:t.value,description:s.value,status:0,created:(new Date).toISOString()},this.saveTaskCallBack)}this.hide()}}(e),n=new class{constructor(t){this.taskIndex=-1,this.callBack=[],this.element=t;const s=t.getElementsByClassName("task_modal_button_cancel")[0],e=t.getElementsByClassName("task_modal_button_ok")[0];s.addEventListener("click",(()=>this.hide())),e.addEventListener("click",(()=>this.onOKClick()))}addEventOK(t){this.callBack.push(t)}show(t){this.taskIndex=t,this.element.classList.remove("delete_modal_none")}hide(){this.element.classList.add("delete_modal_none")}onOKClick(){this.hide(),this.callBack.forEach((t=>t.call(null,this.taskIndex)))}}(a),l=new class{constructor(t,s,e){this.board=t,this.tasks=[],this.taskModel=s,this.deleteModal=e,this.deleteModal.addEventOK(this.deleteTask.bind(this)),t.getElementsByClassName("button_add")[0].addEventListener("click",(()=>this.createTask()))}getTask(){!function(t){const s=new XMLHttpRequest;s.open("GET","https://ahj-homeworks-http-1.herokuapp.com/v1/tickets",!0),s.addEventListener("load",(()=>{200===s.status&&t.displayTasks(JSON.parse(s.response))})),s.send()}(this)}displayTasks(t){if(0!==this.tasks.length){for(const t of this.tasks)t.element.remove();this.tasks=[]}for(const s of t)this.addTask(s)}addTask(s){const e=new t;e.createTask(s,this.taskClick.bind(this)),this.board.appendChild(e.element),this.tasks.push(e);const a=e.element.getElementsByClassName("button_edit")[0],i=e.element.getElementsByClassName("button_delete")[0];a.addEventListener("click",(t=>this.buttonEditClick(t))),i.addEventListener("click",(t=>this.buttonDeleteClick(t)))}taskClick(t,s){this.tasks.find((t=>t.id===s)).descriptionVisibility()}buttonDeleteClick(t){const s=t.target.closest(".task"),e=this.tasks.findIndex((t=>t.id===Number(s.dataset.ID)));this.deleteModal.show(e)}buttonEditClick(t){const s=t.target.closest(".task"),e=this.tasks.findIndex((t=>t.id===Number(s.dataset.ID))),a=this.tasks[e];this.taskModel.setTitle("Изменить тикет"),this.taskModel.setData(a.info),this.taskModel.show()}deleteTask(t){this.tasks[t].element.remove(),this.tasks.splice(t,1)}createTask(){this.taskModel.setTitle("Добавить тикет"),this.taskModel.setData({id:-1,name:"",description:""}),this.taskModel.show()}}(s,i,n);l.getTask(),i.setBoardCallBack(l.getTask.bind(l))})();