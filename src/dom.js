import { getTasks, getProjects, addTaskHandler, deleteTaskHandler } from "./index.js";
import Delete from "./images/delete.svg";


// Cache base DOM
const content = document.querySelector("#content");
const menuBar = document.querySelector("#menu-bar");

// Build DOM

function buildDom () {
    const currentProjects = getProjects();
    const currentTaskList = getTasks();

    while (content.firstChild) {
        content.removeChild(content.firstChild);
      }

    currentProjects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        
        const projectHeader = document.createElement("h2");
        projectHeader.textContent = project;

        projectCard.appendChild(projectHeader);
        
        
        currentTaskList.filter((task) => task.project === project).forEach((task) => {
            console.log(task);
            

            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            
            const taskLabel = document.createElement("div");
            taskLabel.textContent = task.task;
            taskLabel.classList.add("task-label");

            const taskMenu = document.createElement("div");
            taskMenu.classList.add("task-menu");

            const deleteButton = document.createElement("img");
            deleteButton.classList.add("action-icon", "delete-button");
            deleteButton.src = Delete;
            deleteButton.addEventListener('click', () => {
                deleteTaskHandler(task);
            })

            taskMenu.appendChild(deleteButton);

            taskCard.appendChild(taskLabel);
            taskCard.appendChild(taskMenu);
            projectCard.appendChild(taskCard);


          });
   
        content.appendChild(projectCard);
    });

}


// ------ ADD TASK BUTTON

const addTaskButton = document.createElement("input");
addTaskButton.type = "button";
addTaskButton.value = "+";
addTaskButton.id = "add-task-button";

addTaskButton.addEventListener('click', () => {
    modalContainer.classList.remove('hidden');
});

menuBar.appendChild(addTaskButton);

// END ADD TASK


// ------ MODAL

const modalContainer = document.querySelector('.modal-container');
const modalCloseButton = document.querySelector('.btn-primary');
const modalSubmitButton = document.querySelector(".btn-submit");
const task = document.querySelector("#task");
const project = document.querySelector("#project");
const date = document.querySelector("#date");

modalCloseButton.addEventListener('click', () => {
    closeModal();
});

function closeModal() {
    modalContainer.classList.add('hidden');
}

modalSubmitButton.addEventListener("click", () => {
    if (task.value === "" || project.value === "") {
        console.log("Error");
    } else {
    addTaskHandler(task.value, project.value, date.value);
   
    task.value = "";
    project.value = "";
    date.value = "MM-DD-YYYY";
    closeModal();
    }

    
});
    
// END MODAL


function helloDom () {
    console.log("dom.js loaded");
}

export { helloDom, buildDom };