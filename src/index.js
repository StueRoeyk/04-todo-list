import "./style.css";
import { helloTasks, addTask, deleteTask, editTask, completeTask, undoTaskCompletion, deleteCompletedTask, shareTaskList, shareCompletedTaskList, addProject, editProject, deleteProject, deleteProjectTasks, moveProjectTasks, shareProjectList } from "./tasks.js";
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

const undoTaskCompletionHandler = (task) => {
    undoTaskCompletion(task);
    buildDom();
}

const deleteCompletedTaskHandler = (task) => {
    deleteCompletedTask(task);
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

const deleteProjectHandler = (project) => {
    deleteProject(project);
    buildDom();
}

const deleteProjectTasksHandler = (project) => {
    deleteProjectTasks(project);
    buildDom();
}

const moveProjectTasksHandler = (project) => {
    moveProjectTasks(project);
    buildDom();
}

function getProjects () {
    return shareProjectList();
}




export { addTaskHandler, deleteTaskHandler, editTaskHandler, completeTaskHandler, undoTaskCompletionHandler, deleteCompletedTaskHandler, getTasks, getCompleted, addProjectHandler, editProjectHandler, deleteProjectHandler, deleteProjectTasksHandler, moveProjectTasksHandler, getProjects };