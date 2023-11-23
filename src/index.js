import "./style.css";
import { helloTasks, addTask, deleteTask, editTask, completeTask, shareTaskList, shareCompletedTaskList, addProject, editProject, shareProjectList } from "./tasks.js";
import { helloDom, buildDom } from "./dom.js";

console.log("index.js loaded");
helloTasks();
helloDom();

buildDom();

const addTaskHandler = (task, project, date) => {
    addTask(task, project, date);
    buildDom();
};

const deleteTaskHandler = (task) => {
    deleteTask(task);
    buildDom();
};

const editTaskHandler = (oldTask, task, project, date) => {
    editTask(oldTask, task, project, date);
    buildDom();
}

const completeTaskHandler = (task) => {
    completeTask(task);
    buildDom();
}

function getTasks () {
    return shareTaskList();
}

function getCompleted () {
    return shareCompletedTaskList();
}

function addProjectHandler (project) {
    addProject(project);
    buildDom();
}

function editProjectHandler (oldProject, project) {
    editProject(oldProject, project);
    buildDom();
}

function getProjects () {
    return shareProjectList();
}




export { addTaskHandler, deleteTaskHandler, editTaskHandler, completeTaskHandler, getTasks, getCompleted, addProjectHandler, editProjectHandler, getProjects };