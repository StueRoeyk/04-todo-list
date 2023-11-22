import { buildDom } from "./dom";
const { compareDesc, compareAsc, parse, parseISO } = require('date-fns');

const taskList = [];
const projectList = ["General Tasks", "Project 1", "Project 2"];

class Task {
    constructor(task, project, date) {
        this.task = task;
        this.project = project;
        this.date = date;
        //taskList.push(this);
    }
}

function shareTaskList () {
    return taskList;
}

function shareProjectList () {
    return projectList;
}

function addTask (task, project, date) {
    const newTask = new Task(task, project, date);
    taskList.push(newTask);
    taskList.sort((a, b) => compareDesc(parseISO(b.date), parseISO(a.date)));
}

function editTask (oldTask, task, project, date) {
    taskList.splice(taskList.indexOf(oldTask), 1);
    addTask(task, project, date);
    buildDom();
}

function deleteTask (task) {
    taskList.splice(taskList.indexOf(task), 1);
}

addTask("Buy groceries", "General Tasks", "2023-11-08");
addTask("Cook dinner",  "General Tasks", "2023-10-09");
addTask("Buy presents",  "Project 1", "2023-11-10");


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

export { helloTasks, addTask, deleteTask, editTask, shareTaskList, shareProjectList };