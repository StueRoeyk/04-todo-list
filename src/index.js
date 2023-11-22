import "./style.css";
import { helloTasks, addTask, deleteTask, shareTaskList, shareProjectList } from "./tasks.js";
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

function getTasks () {
    return shareTaskList();
}

function getProjects () {
    return shareProjectList();
}




export { addTaskHandler, deleteTaskHandler, getTasks, getProjects };
  
  


