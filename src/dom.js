import { getTasks, getCompleted, getProjects, addTaskHandler, deleteTaskHandler, editTaskHandler, completeTaskHandler, undoTaskCompletionHandler, deleteCompletedTaskHandler, addProjectHandler, editProjectHandler, deleteProjectHandler, deleteProjectTasksHandler, moveProjectTasksHandler } from "./index.js";
import Delete from "./images/delete.svg";
import DeleteGrey from "./images/delete-grey.svg"
import Edit from "./images/edit.svg";
import Options from "./images/options.svg";
import Dew from "./images/dew.png";
import Circle from "./images/circle.svg";
import Undo from "./images/undo.svg";
const { format, parseISO } = require('date-fns');


// Cache base DOM
const content = document.querySelector("#content");
const menuBar = document.querySelector("#menu-bar");

// Build DOM

function buildDom () {
    const currentProjects = getProjects();
    const currentTaskList = getTasks();
    const currentCompletedTaskList = getCompleted();

    window.onclick = function(event) {
        if (!event.target.matches('.project-options-button')) {    
          let dropdowns = document.getElementsByClassName("project-options-dropdown");
          for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
    }

    while (content.firstChild) {
        content.removeChild(content.firstChild);
      }

    currentProjects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const projectHeaderBox = document.createElement("div")
        projectHeaderBox.classList.add("project-header-box");
        
        const projectHeader = document.createElement("h2");
        projectHeader.textContent = project;

        projectHeaderBox.appendChild(projectHeader);
        
        if (project !== "General Tasks") {
            const projectOptionsBox = document.createElement("div");
            projectOptionsBox.classList.add("project-options-box");

            const projectOptionsButton = document.createElement("img");
            projectOptionsButton.classList.add("action-icon", "project-options-button");
            projectOptionsButton.src = Options;

            projectOptionsButton.addEventListener("click", (event) => {
                event.stopPropagation()
                projectOptionsDropdown.classList.add("show");
            })
            
            const projectOptionsDropdown = document.createElement("div");
            projectOptionsDropdown.classList.add("project-options-dropdown");

            const editProjectButton = document.createElement("div");
            editProjectButton.classList.add("project-dropdown-button");
            editProjectButton.textContent = "Edit";
            editProjectButton.addEventListener("click", () => {
                console.log("Edit!")
                buildEditProjectModal(project);
            });

            const deleteProjectButton = document.createElement("div");
            deleteProjectButton.classList.add("project-dropdown-button");
            deleteProjectButton.textContent = "Delete";
            deleteProjectButton.addEventListener("click", () => {
                if (currentTaskList.some(task => task.project === project)) {
                    deleteProjectModal(project);
                } else {
                    deleteProjectHandler(project);
                }
                
            })

            projectOptionsDropdown.appendChild(editProjectButton);
            projectOptionsDropdown.appendChild(deleteProjectButton);
            projectOptionsBox.appendChild(projectOptionsDropdown);
            projectOptionsBox.appendChild(projectOptionsButton);
            projectHeaderBox.appendChild(projectOptionsBox);
        }
        

        projectCard.appendChild(projectHeaderBox);
        
        currentTaskList.filter((task) => task.project === project).forEach((task) => {
            
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            
            const taskContent = document.createElement("div");
            taskContent.classList.add("task-content");

            const taskCircle = document.createElement("img");
            taskCircle.classList.add("action-icon", "task-circle");
            taskCircle.src = Circle;
            taskCircle.addEventListener('click', () => {
                completeTaskHandler(task);
            })

            const taskLabel = document.createElement("div");
            taskLabel.textContent = task.task;
            taskLabel.classList.add("task-label");
            taskLabel.addEventListener('click', () => {
                domTaskEdit(task, taskLabel, taskEditInput);
            })

            const taskEditInput = document.createElement("input");
            taskEditInput.classList.add("task-edit-input");
            taskEditInput.value = task.task;

            const taskMenu = document.createElement("div");
            taskMenu.classList.add("task-menu");

            const dateLabel = document.createElement("div");
            dateLabel.textContent = format(parseISO(task.date), 'MMM dd, yyyy');
            dateLabel.classList.add("date-label");
            dateLabel.addEventListener('click', () => {
                domDateEdit(task, dateLabel, dateEditInput);
            })

            const dateEditInput = document.createElement("input");
            dateEditInput.type = "date";
            dateEditInput.classList.add("date-edit-input");
            dateEditInput.value = task.date;


            const deleteButton = document.createElement("img");
            deleteButton.classList.add("action-icon", "delete-button");
            deleteButton.src = Delete;
            deleteButton.addEventListener('click', () => {
                deleteTaskHandler(task);
            })

            const editButton = document.createElement("img");
            editButton.classList.add("action-icon", "options-button");
            editButton.src = Edit;
            editButton.addEventListener('click', () => {
                buildEditTaskModal(task);
            })

            taskMenu.appendChild(dateLabel);
            taskMenu.appendChild(dateEditInput);
            taskMenu.appendChild(deleteButton);
            taskMenu.appendChild(editButton);

            taskContent.appendChild(taskCircle);
            taskContent.appendChild(taskLabel);
            taskContent.appendChild(taskEditInput);
            taskCard.appendChild(taskContent);
            taskCard.appendChild(taskMenu);
            projectCard.appendChild(taskCard);


          });

          // PROJECT CARD COMPLETED TASK FOOTER
         
          if (currentCompletedTaskList.some(task => task.project === project)) {
            const projectFooterBox = document.createElement("div");
            projectFooterBox.classList.add("project-footer-box");

            const projectFooterLabel = document.createElement("h3");
            projectFooterLabel.textContent = "Completed tasks:";

            projectFooterBox.appendChild(projectFooterLabel);
            projectCard.appendChild(projectFooterBox);
    
            currentCompletedTaskList.filter((task) => task.project === project).forEach((task) => {
            
                const taskCard = document.createElement("div");
                taskCard.classList.add("task-card", "footer");
                
                const taskContent = document.createElement("div");
                taskContent.classList.add("task-content");
            
                const taskCircle = document.createElement("img");
                taskCircle.classList.add("action-icon", "task-circle");
                taskCircle.src = Undo;
                taskCircle.addEventListener('click', () => {
                    undoTaskCompletionHandler(task);
                })

                const taskLabel = document.createElement("div");
                taskLabel.textContent = task.task;
                taskLabel.classList.add("task-label", "footer");
            
                const taskMenu = document.createElement("div");
                taskMenu.classList.add("task-menu");
            
                const deleteButton = document.createElement("img");
                deleteButton.classList.add("action-icon", "delete-button");
                deleteButton.src = DeleteGrey;
                deleteButton.addEventListener('click', () => {
                    deleteCompletedTaskHandler(task);
                })
            
                taskContent.appendChild(taskCircle);
                taskContent.appendChild(taskLabel);
                taskMenu.appendChild(deleteButton);

                taskCard.appendChild(taskContent);
                taskCard.appendChild(taskMenu);
                projectCard.appendChild(taskCard);
            
              });
          }
   
        content.appendChild(projectCard);
    });

}

// ON-DOM EDITING

function domTaskEdit(task, taskLabel, taskEditInput) {
    const oldTask = task;
    const project = task.project;
    const date = task.date;
    taskLabel.classList.add("active");
    taskEditInput.classList.add("active");
    taskEditInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            taskEditInput.blur();
        }
    });
    taskEditInput.addEventListener('focusout', () => {
        taskLabel.classList.remove("active");
        taskEditInput.classList.remove("active");
        editTaskHandler(oldTask, taskEditInput.value, project, date);
    });
    taskEditInput.focus();
}

function domDateEdit(task, dateLabel, dateEditInput) {
    const oldTask = task;
    const taskTask = task.task;
    const project = task.project;
    const date = task.date;
    dateLabel.classList.add("active");
    dateEditInput.classList.add("active");
    dateEditInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            dateEditInput.blur();
        }
    });
    dateEditInput.addEventListener('focusout', () => {
        dateLabel.classList.remove("active");
        dateEditInput.classList.remove("active");
        editTaskHandler(oldTask, taskTask, project, dateEditInput.value);
    });
    dateEditInput.focus();
}



// END ON-DOM EDITING


// ------ ADD TASK BUTTON

const addTaskButton = document.createElement("input");
addTaskButton.type = "button";
addTaskButton.value = "+";
addTaskButton.id = "add-task-button";

addTaskButton.addEventListener('click', () => {
    buildAddTaskModal();
});

menuBar.appendChild(addTaskButton);

// END ADD TASK BUTTON

// ------ ADD PROJECT BUTTON

const addProjectButton = document.createElement("input");
addProjectButton.type = "button";
addProjectButton.value = "+";
addProjectButton.id = "add-project-button";

addProjectButton.addEventListener('click', () => {
    buildAddProjectModal();
});

menuBar.appendChild(addProjectButton);

// END ADD TASK BUTTON

// ------- COMMANDS

function buildAddTaskModal () {
    addModalFrame();
    addTaskModal();
}

function buildEditTaskModal (task) {
    addModalFrame();
    editTaskModal(task);
}

function buildAddProjectModal () {
    projectModal();
    addProjectModal();
}

function buildEditProjectModal (project) {
    projectModal();
    editProjectModal(project);
}



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
    dateSelect.value = new Date().toISOString().split('T')[0];

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

// ------ **ADD** TASK MODAL

function addTaskModal () {
    const headerText = document.querySelector("#header-text");
    headerText.textContent = "Create new task:";

    const createButton = document.querySelector(".submit-button");
    createButton.textContent = "Create";

    const taskField = document.querySelector("#task");
    const dateField = document.querySelector("#date");
    const projectField = document.querySelector("#project");

    createButton.addEventListener("click", () => { 
        if (taskField.value === "" || projectField.value === "") {
            console.log("Error");
        } else {
        addTaskHandler(taskField.value, projectField.value, dateField.value);
        closeModal();
        }
    })
}
// END ADD TASK MODAL

// ------ EDIT TASK MODAL
function editTaskModal(task) {

    const oldTask = task;

    const headerText = document.querySelector("#header-text");
    headerText.textContent = "Edit task:";

    const editButton = document.querySelector(".submit-button");
    editButton.textContent = "Save";
    editButton.addEventListener('click', () => {
        editTaskHandler(oldTask, taskField.value, projectField.value, dateField.value);
        closeModal();
    });

    const taskField = document.querySelector("#task");
    const dateField = document.querySelector("#date");
    const projectField = document.querySelector("#project");

    taskField.value = task.task;
    const projectArray = document.querySelectorAll("#project > option");
    projectArray.forEach((project) => {
        if (project.value === task.project) {
            project.setAttribute("selected", "selected");
        }
    });
    dateField.value = task.date;
 
}
// END EDIT TASK MODAL

// PROJECT MODAL

function projectModal () {

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
    
    // PROJECT
    const label1 = document.createElement("label");
    label1.htmlFor = "project";
    label1.textContent = "Project:";

    const projectInput = document.createElement('input');
    projectInput.type = 'project';
    projectInput.name = 'project';
    projectInput.id = 'project';

    modalInputDiv1.appendChild(label1);
    modalInputDiv1.appendChild(projectInput);
    // END PROJECT


    modalForm.appendChild(modalInputDiv1);
    
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
// END PROJECT MODAL

// ADD-PROJECT MODAL
function addProjectModal () {

    const currentProjects = getProjects();

    const headerText = document.querySelector("#header-text");
    headerText.textContent = "Create new project:";

    const createButton = document.querySelector(".submit-button");
    createButton.textContent = "Create";

    const projectField = document.querySelector("#project");
    projectField.focus();

    createButton.addEventListener("click", () => { 
        if (projectField.value === "") {
            console.log("Error");
        } else if (currentProjects.includes(projectField.value)) {
            console.log("Cannot have duplicate project names");
        } else {
        addProjectHandler(projectField.value);
        closeModal();
        }
    })
}
// END ADD-PROJECT MODAL

// EDIT-PROJECT MODAL
function editProjectModal (project) {

    const oldProject = project;

    const currentProjects = getProjects();

    const headerText = document.querySelector("#header-text");
    headerText.textContent = "Edit project name:";

    const createButton = document.querySelector(".submit-button");
    createButton.textContent = "Save";

    const projectField = document.querySelector("#project");
    projectField.focus();

    createButton.addEventListener("click", () => { 
        if (projectField.value === "") {
            console.log("Error");
        } else if (currentProjects.includes(projectField.value)) {
            console.log("Cannot have duplicate project names");
        } else {
        editProjectHandler(oldProject, projectField.value);
        closeModal();
        }
    })
}
// END EDIT-PROJECT MODAL

// DELETE PROJECT WARNING MODAL
function deleteProjectModal (project) {
    const modalHook = document.querySelector("#modal-hook");

    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container");

    const modal = document.createElement("div");
    modal.classList.add("modal", "warning");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const headerText = document.createElement("h2");
    headerText.textContent = "Delete Project - Warning!";
    headerText.id = "header-warning-text";

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn", "close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener('click', () => {
        closeModal();
    });

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const modalForm = document.createElement("form");

    const modalWarning1 = document.createElement("div");
    modalWarning1.classList.add("modal-warning-div");
    modalWarning1.textContent = "Do you want existing tasks for this project to be deleted, or moved to \"General Tasks\"?";

    const modalWarning2 = document.createElement("div");
    modalWarning2.classList.add("modal-warning-div");
    modalWarning2.textContent = "This choice cannot be undone.";

    modalForm.appendChild(modalWarning1);
    modalForm.appendChild(modalWarning2);
    
    // FINAL CTA BUTTONS

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "submit-button", "delete-warning");
    deleteButton.textContent = "Delete tasks";
    deleteButton.addEventListener("click", () => {
        deleteProjectTasksHandler(project);
        closeModal();
    })
    modalFooter.appendChild(deleteButton);

    const submitButton = document.createElement("button");
    submitButton.classList.add("btn", "submit-button");
    submitButton.textContent = "Move tasks";
    submitButton.addEventListener("click", () => {
        moveProjectTasksHandler(project);
        closeModal();
    })
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



function closeModal() {
    const modalHook = document.querySelector("#modal-hook");
    while (modalHook.firstChild) {
        modalHook.removeChild(modalHook.firstChild);
    }
}

function helloDom () {
    console.log("dom.js loaded");
}

export { helloDom, buildDom };