currentCompletedTaskList.filter((task) => task.project === project).forEach((task) => {
            
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card", "footer");
    
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

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

    taskContent.appendChild(taskLabel);

    taskCard.appendChild(taskContent);
    taskCard.appendChild(taskMenu);
    projectCard.appendChild(taskCard);

  });
