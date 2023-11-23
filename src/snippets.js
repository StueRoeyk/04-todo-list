currentCompletedTaskList.filter((task) => task.project === project).forEach((task) => {
            
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
    taskMenu.appendChild(deleteButton);
    taskMenu.appendChild(editButton);

    taskContent.appendChild(taskCircle);
    taskContent.appendChild(taskLabel);
    taskContent.appendChild(taskEditInput);
    taskCard.appendChild(taskContent);
    taskCard.appendChild(taskMenu);
    projectCard.appendChild(taskCard);

  });
