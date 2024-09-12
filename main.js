let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = []; // Empty Array to store tasks

//Check If there are Tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

//ADD TASK
submit.addEventListener("click", () => {
  if (input.value !== "") {
    addTasksToArray(input.value); //Add tasks to array of tasks
    input.value = ""; // Empty input field
  }
});
// ADD TASK using the "Enter" key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (input.value !== "") {
      addTasksToArray(input.value); // Add task to array of tasks
      input.value = ""; // Empty input field
    }
  }
});

// CLick on task element
tasksDiv.addEventListener("click", (e) => {
  //DELETE ELEMENT
  if (e.target.classList.contains("delete")) {
    //remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    //remove element from page
    e.target.parentElement.remove();
  }

  //TASK ELEMENT

  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

let addTasksToArray = (taskText) => {
  //task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //push tasks to array
  arrayOfTasks.push(task);
  //add tasks to page
  addTasksToPage(arrayOfTasks);
  //Add Tasks To local storage
  addDataToLocalStorageFrom(arrayOfTasks);
};

function addTasksToPage(arrayOfTasks) {
  //empty tasks div
  tasksDiv.innerHTML = "";
  //looping on arrayOFTasks
  arrayOfTasks.forEach((task) => {
    //Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    //check if task is done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //Create Delete Button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    //Append Button To Main Div
    div.appendChild(span);
    //Add task div To Task Container
    tasksDiv.append(div);
  });
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}
function deleteTaskWith(taskId) {
  // Filter out the task that matches the taskId
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);

  // Update the local storage after the task has been removed
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
