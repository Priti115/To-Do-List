const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
function AddTask() {
    if (inputBox.value.trim() === '') {
        alert("Please enter a task!");
        return;
    }

    // Create a new task item (li)
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    // Create the "X" button for deletion
    let span = document.createElement("span");
    span.textContent = " X";
    span.style.marginLeft = "10px";
    span.style.cursor = "pointer";
    li.appendChild(span);

    // Clear the input box after adding the task
    inputBox.value = '';

    // Save data to localStorage after adding the task
    saveData();
}

// Event listener for task completion and deletion
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('completed'); // Toggle completed class
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the task
        saveData();
    }
}, false);

// Function to save data in localStorage
function saveData() {
    // Store the entire list container, so it's saved including tasks
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display saved tasks from localStorage
function showTask() {
    // Check if there's any saved data in localStorage
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

// Add event listener to the input box to trigger AddTask on Enter key press
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") { // Detect Enter key press
        AddTask();
    }
});

// Ensuring task click events work after reloading
window.onload = function () {
    showTask();
};
