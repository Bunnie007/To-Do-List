const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    
    if (taskText === '') {
        displayMessage("You must write something!");
        return;
    }

    const li = createTaskElement(taskText);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    return li;
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
}, false);

function saveData() {
    try {
        localStorage.setItem("tasks", listContainer.innerHTML);
    } catch (error) {
        console.error("Error saving data to localStorage:", error);
        displayMessage("Error saving data!");
    }
}

function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000);
}

function showTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
}

showTasks();
