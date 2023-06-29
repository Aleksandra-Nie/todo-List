{
  let tasks = [

  ];

  let hideDoneTask = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ]
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );

    render();
  };

  const toggleHideDoneTask = () => {
    hideDoneTask = !hideDoneTask;
    render();
  };

  const markAllTasksCompleted = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const resetButton = () => {
    const resetElements = document.querySelector(".js-reset");

    if (!tasks.length) {
      resetElements.innerHTML = "";
      return;
    }

    resetElements.innerHTML = `
    <button type="reset" class="button button--reset" onClick = "reset()">Usuń wszystkie</button>
    `;
  };

  function reset() {
    document.getElementById("myForm").reset();
  }

  const renderButtons = () => {
    const buttonElements = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonElements.innerHTML = "";
      return;
    }

    buttonElements.innerHTML = `
        <button 
            class="button js-toggleHideDoneTasks"
            >
            ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone ✓
        </button>
        <button class="button js-markAllCompleted"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
        Ukończ wszystkie
        </button>
    `;
  };

  const bindButtonEvents = () => {
    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTask);
    }

    const markAllCompletedTasksButton = document.querySelector(".js-markAllCompleted");

    if (markAllCompletedTasksButton) {
      markAllCompletedTasksButton.addEventListener("click", markAllTasksCompleted);
    }
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="list__item${task.done && hideDoneTask ? " list__item--hidden" : ""
        } js-tasks">
        <button class="list__buttonTask list__buttonTask--toggleDone js-done">
          ${task.done ? " ✓ " : ""}
        </button>
        <span class="list__content ${task.done ? "list__content--done" : ""}">
          ${task.content}
        </span>
        <button class="list__buttonTask list__buttonTask--remove js-remove">
          🗑
        </button>
        </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

  };

  render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonEvents();
    resetButton();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
    }
    newTaskElement.value = "";
    newTaskElement.focus();
  };

  const resetForm = () => {
    const tasks = document.querySelector(".js-tasks");
    const buttonElements = document.querySelector(".js-buttons");
    const resetElements = document.querySelector(".js-reset");
    tasks.innerHTML = "";
    buttonElements.innerHTML = "";
    resetElements.innerHTML = ""
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
    form.addEventListener("reset", resetForm);
  };

  init();
}
