import { buildDom } from "./dom.js";
const { compareDesc, parseISO } = require('date-fns');

let taskList = [];
let completedTaskList = [];
let projectList = [];

class Task {
    constructor(task, project, date) {
        this.task = task;
        this.project = project;
        this.date = date;
        //taskList.push(this);
    }
}

function storeTaskLocally () {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function storeProjectLocally () {
    console.log(projectList);
    localStorage.setItem("projectList", JSON.stringify(projectList));
}

function storeCompletedLocally () {
    localStorage.setItem("completedList", JSON.stringify(completedTaskList));
}

function retrieveLocalStorage() {
    if ((window.localStorage.hasOwnProperty('taskList'))) {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    if (window.localStorage.hasOwnProperty('projectList')) {
        projectList = JSON.parse(localStorage.getItem("projectList"));
    }
    if (window.localStorage.hasOwnProperty('completedList')) {
        completedTaskList = JSON.parse(localStorage.getItem("completedList"));
    }
}



if (window.localStorage.length > 0) {
    retrieveLocalStorage();
} else {
    addProject("General Tasks");
    addProject("Project 1");
    addProject("Project 2");
    addTask("Buy groceries", "General Tasks", "2023-11-08");
    addTask("Cook dinner",  "General Tasks", "2023-10-09");
    addTask("Buy presents",  "Project 1", "2023-11-10");
}

function shareTaskList () {
    return taskList;
}

function shareProjectList () {
    return projectList;
}

function shareCompletedTaskList() {
    return completedTaskList;
}

function addTask (task, project, date) {
    const newTask = new Task(task, project, date);
    taskList.push(newTask);
    sortTasks();
    storeTaskLocally();
}

function editTask (oldTask, task, project, date) {
    taskList.splice(taskList.indexOf(oldTask), 1);
    addTask(task, project, date);
    storeTaskLocally();
}

function deleteTask (task) {
    taskList.splice(taskList.indexOf(task), 1);
    storeTaskLocally();
}

function completeTask (task) {
    completedTaskList.push(taskList.splice(taskList.indexOf(task), 1)[0]);
    storeTaskLocally();
    storeCompletedLocally();
}

function undoTaskCompletion (task) {
    taskList.push(completedTaskList.splice(completedTaskList.indexOf(task), 1)[0]);
    sortTasks();
    storeTaskLocally();
    storeCompletedLocally();
};

function deleteCompletedTask (task) {
    completedTaskList.splice(completedTaskList.indexOf(task), 1);
    storeCompletedLocally();
}

function addProject (project) {
    projectList.push(project);
    sortProjects();
    storeProjectLocally();
}

function editProject (oldProject, project) {
    projectList.splice(projectList.indexOf(oldProject), 1);
    addProject(project);
    taskList.forEach((task) => {
        if (task.project === oldProject) {
            task.project = project;
        }
    });
    sortProjects();
    storeProjectLocally();
};

function deleteProject (project) {
    projectList.splice(projectList.indexOf(project), 1);
    storeProjectLocally();
}

function deleteProjectTasks (project) {
    taskList.forEach((task) => {
        if (task.project === project) {
            deleteTask(task);
        }
    })
    deleteProject(project);
}

function moveProjectTasks (project) {
    taskList.forEach((task) => {
        if (task.project === project) {
            task.project = "General Tasks";
        }
    })
    storeTaskLocally();
    deleteProject(project);
}

function sortTasks () {
    taskList.sort((a, b) => compareDesc(parseISO(b.date), parseISO(a.date)));
}

function sortProjects () {
    projectList.sort();
    const generalTasksIndex = projectList.indexOf("General Tasks");
    projectList.unshift(projectList.splice(generalTasksIndex, 1)[0]);  
}


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

export { helloTasks, addTask, deleteTask, editTask, completeTask, undoTaskCompletion, 
    deleteCompletedTask, shareTaskList, shareCompletedTaskList, addProject, editProject, 
    deleteProject, deleteProjectTasks, moveProjectTasks, shareProjectList };