import "./style.css";

console.log("index.js loaded")


const taskList = [];

class task {
    constructor(title, status) {
        this.title = title;
        this.status = status;
        taskList.push(this)
    }
}

new task("Buy groceries", false);
new task("Cook dinner", false);
console.log(taskList);

localStorage.setItem("taskList", JSON.stringify(taskList));

const taskList2 = JSON.parse(localStorage.getItem("taskList"));
console.log(taskList2);
console.log(taskList2[0]);
console.log(taskList2[1]);
