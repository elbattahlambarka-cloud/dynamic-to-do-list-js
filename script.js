// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize and Load Tasks
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTaskToDOM(taskText, false); // 'false' indicates not to save again to Local Storage
        });
    }

    // Function to add task to DOM
    function addTaskToDOM(taskText, save = true) {
        // Task Creation and Removal
        // Create new list item
        const listItem = document.createElement('li');
        
        // Set textContent to taskText
        listItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Assign onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };
        
        // Append remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);
        
        // Save to Local Storage if needed
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();
        
        // Check if task text is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Add task to DOM and save to Local Storage
        addTaskToDOM(taskText, true);
        
        // Clear the task input field
        taskInput.value = '';
    }

    // Load tasks when page loads
    loadTasks();

    // Attach Event Listeners
    // Add click event listener to Add Task button
    addButton.addEventListener('click', addTask);
    
    // Add keypress event listener to task input for Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});