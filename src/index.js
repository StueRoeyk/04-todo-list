import "./style.css";
import { helloTasks, addTask, deleteTask, editTask, shareTaskList, addProject, editProject, shareProjectList } from "./tasks.js";
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

function getTasks () {
    return shareTaskList();
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




export { addTaskHandler, deleteTaskHandler, editTaskHandler, getTasks, addProjectHandler, editProjectHandler, getProjects };