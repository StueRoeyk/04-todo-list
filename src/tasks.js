const { compareDesc, parseISO } = require('date-fns');

const taskList = [];
const completedTaskList = [];
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

function shareCompletedTaskList() {
    return completedTaskList;
}

function addTask (task, project, date) {
    const newTask = new Task(task, project, date);
    taskList.push(newTask);
    sortTasks();
}

addTask("Buy groceries", "General Tasks", "2023-11-08");
addTask("Cook dinner",  "General Tasks", "2023-10-09");
addTask("Buy presents",  "Project 1", "2023-11-10");


function editTask (oldTask, task, project, date) {
    taskList.splice(taskList.indexOf(oldTask), 1);
    addTask(task, project, date);
}

function deleteTask (task) {
    taskList.splice(taskList.indexOf(task), 1);
}

function completeTask (task) {
    completedTaskList.push(taskList.splice(taskList.indexOf(task), 1)[0]);
}

function undoTaskCompletion (task) {
    taskList.push(completedTaskList.splice(completedTaskList.indexOf(task), 1)[0]);
    sortTasks();
};

function deleteCompletedTask (task) {
    completedTaskList.splice(completedTaskList.indexOf(task), 1);
}

function addProject (project) {
    projectList.push(project);
    sortProjects();
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
};

function deleteProject (project) {
    projectList.splice(projectList.indexOf(project), 1);
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

export { helloTasks, addTask, deleteTask, editTask, completeTask, undoTaskCompletion, deleteCompletedTask, shareTaskList, shareCompletedTaskList, addProject, editProject, deleteProject, deleteProjectTasks, moveProjectTasks, shareProjectList };