const taskList = [];
const projectList = ["General Tasks", "Project 1"];

class Task {
    constructor(task, project, date) {
        this.task = task;
        this.project = project;
        this.date = date;
        taskList.push(this);
    }
}

function shareTaskList () {
    return taskList;
}

function shareProjectList () {
    return projectList;
}

function addTask (task, project, date) {
    new Task(task, project, date);
}

function deleteTask (task) {
    console.log(task);
    console.log(taskList.indexOf(task));
    taskList.splice(taskList.indexOf(task), 1);
}

new Task("Buy groceries", "General Tasks", "2023-11-08");
new Task("Cook dinner",  "General Tasks", "2023-11-09");

/*
localStorage.setItem("taskList", JSON.stringify(taskList));

const taskList2 = JSON.parse(localStorage.getItem("taskList"));
console.log(taskList2);
console.log(taskList2[0]);
console.log(taskList2[1]);
console.log(taskList2[0].project);
*/


function helloTasks () {
    console.log("tasks.js loaded");
}

export { helloTasks, addTask, deleteTask, shareTaskList, shareProjectList };