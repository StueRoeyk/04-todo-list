import { getTasks, getProjects, addTaskHandler, deleteTaskHandler } from "./index.js";
import Delete from "./images/delete.svg";
import Options from "./images/options.svg";
const { format, parseISO } = require('date-fns');


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

            const dateLabel = document.createElement("div");
            dateLabel.textContent = format(parseISO(task.date), 'MMM dd, yyyy');
            dateLabel.classList.add("date-label");

            const deleteButton = document.createElement("img");
            deleteButton.classList.add("action-icon", "delete-button");
            deleteButton.src = Delete;
            deleteButton.addEventListener('click', () => {
                deleteTaskHandler(task);
            })

            taskMenu.appendChild(dateLabel);
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
    addModalFrame();
    addTaskModal();
});

menuBar.appendChild(addTaskButton);

// END ADD TASK BUTTON


// ------ BUILD GENERAL MODAL

function addModalFrame() { 
    const modalHook = document.querySelector("#modal-hook");

    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container");

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const headerText = document.createElement("h2");
    headerText.textContent = "";
    headerText.id = "header-text";

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn", "close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener('click', () => {
        closeModal();
    });

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const modalForm = document.createElement("form");

    const modalInputDiv1 = document.createElement("div");
    modalInputDiv1.classList.add("modal-input-div");
    
    // POSSIBLE BREAKPOINT FOR "NEW PROJECT" FLOW
    
    const modalInputDiv2 = document.createElement("div");
    modalInputDiv2.classList.add("modal-input-div");
    const modalInputDiv3 = document.createElement("div");
    modalInputDiv3.classList.add("modal-input-div");

    // TASK
    const label1 = document.createElement("label");
    label1.htmlFor = "task";
    label1.textContent = "Task:";

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.name = 'task';
    taskInput.id = 'task';

    modalInputDiv1.appendChild(label1);
    modalInputDiv1.appendChild(taskInput);
    // END TASK

    // PROJECT
    const label2 = document.createElement("label");
    label2.htmlFor = "project";
    label2.textContent = "Project:";

    const projectSelect = document.createElement("select");
    projectSelect.name = "project";
    projectSelect.id = "project";

    modalInputDiv2.appendChild(label2);
    modalInputDiv2.appendChild(projectSelect);

    const selectOption0 = document.createElement("option");
    selectOption0.value = "General Tasks";
    selectOption0.textContent = "General Tasks";

    projectSelect.appendChild(selectOption0);

    const currentProjects = getProjects();

    if (currentProjects.length < 2) {
        console.log(currentProjects.length);
        projectSelect.setAttribute("disabled", "disabled");
    } else {
        for (let i = 1; i < currentProjects.length ; i++ ) {
            const selectOption = document.createElement("option");
            selectOption.value = currentProjects[i];
            selectOption.textContent = currentProjects[i];
            projectSelect.appendChild(selectOption);
        }
    }
    // END PROJECT


    // DATE
    const label3 = document.createElement("label");
    label3.htmlFor = "date";
    label3.textContent = "Due date:";

    const dateSelect = document.createElement("input");
    dateSelect.type = "date";
    dateSelect.name = "date";
    dateSelect.id = "date";

    modalInputDiv3.appendChild(label3);
    modalInputDiv3.appendChild(dateSelect);
    // END DATE

    modalForm.appendChild(modalInputDiv1);
    modalForm.appendChild(modalInputDiv2);
    modalForm.appendChild(modalInputDiv3);
    

    // FINAL CTA BUTTON

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    const submitButton = document.createElement("button");
    submitButton.classList.add("btn", "submit-button");
    submitButton.textContent = "";

    modalFooter.appendChild(submitButton);
    
    modalBody.appendChild(modalForm);
    
    modalHeader.appendChild(headerText);
    modalHeader.appendChild(closeButton);

    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);
    modalContainer.appendChild(modal);
    modalHook.appendChild(modalContainer);

}

function addTaskModal () {
    const headerText = document.querySelector("#header-text");
    headerText.textContent = "Create new task:";

    const createButton = document.querySelector(".submit-button");
    createButton.textContent = "Create";

    const task = document.querySelector("#task");
    const date = document.querySelector("#date");
    const project = document.querySelector("#project");

    createButton.addEventListener("click", () => {
        console.log("the task value is " + task.value);    
        if (task.value === "" || project.value === "") {
            console.log("Error");
        } else {
        addTaskHandler(task.value, project.value, date.value);
       
        task.value = "";
        project.value = "General Tasks";
        date.value = "MM-DD-YYYY";
        closeModal();
        }
    })
}

function editTaskModal() {
    console.log("Editing the task!");
}

function closeModal() {
    const modalHook = document.querySelector("#modal-hook");
    while (modalHook.firstChild) {
        modalHook.removeChild(modalHook.firstChild);
    }
}

// END BUILD GENERAL MODAL



// ------ EDIT TASK MODAL

/* function editTaskModal () {

    const editContainer = document.createElement('.edit-container');
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
        project.value = "General Tasks";
        date.value = "MM-DD-YYYY";
        closeModal();
        }
    
        
    });

} */

    
// END ADD TASK MODAL


function helloDom () {
    console.log("dom.js loaded");
}

export { helloDom, buildDom };