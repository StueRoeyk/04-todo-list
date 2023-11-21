import "./style.css";
import { helloTasks, addTask, shareTaskList, shareProjectList } from "./tasks.js";
import { helloDom, buildDom } from "./dom.js";

console.log("index.js loaded");
helloTasks();
helloDom();

buildDom();

const addTaskHandler = (task, project, date) => {
    addTask(task, project, date);
    buildDom();
};

function getTasks () {
    return shareTaskList();
}

function getProjects () {
    return shareProjectList();
}




export { addTaskHandler, getTasks, getProjects };
  
  


