document.addEventListener("DOMContentLoaded", async () => {
        const response = await fetch('/reports');
        const reports = await response.json();
    
        const todoList = document.getElementById('todo');

        reports.forEach(report => {
            const listItem = document.createElement('li');
            listItem.textContent = `${report.title} - ${report.description} (${report.tag}, ${report.location})`;
            todoList.appendChild(listItem);
        });

});

// Aktuálisan szerkesztett feladat ID-je
let currentTaskId = null;

// Rejtett űrlap megjelenítése/eltüntetése
function toggleTaskForm() {
    const formContainer = document.getElementById('task-form-container');
    formContainer.style.display = formContainer.style.display === 'none' || !formContainer.style.display ? 'block' : 'none';
}

// Szerkesztési panel megjelenítése/eltüntetése
function toggleEditTaskForm(taskId = null) {
    const editFormContainer = document.getElementById('edit-task-container');
    editFormContainer.style.display = editFormContainer.style.display === 'none' || !editFormContainer.style.display ? 'block' : 'none';
    if (taskId) {
        currentTaskId = taskId;
        const taskElement = document.getElementById(taskId);
        const taskDetailsName = document.getElementById('task-details-name');
        taskDetailsName.textContent = `Feladat: ${taskElement.querySelector('strong').textContent}`;
    }
}

// Új feladat hozzáadása
/*
document.getElementById('task-form-popup').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('popup-task-input');
    const taskUser = document.getElementById('task-user').value;
    const taskText = taskInput.value;

    if (taskText && taskUser) {
        const taskItem = document.createElement('li');

        // Csak a feladat neve és felhasználó jelenik meg
        taskItem.innerHTML = `
            <strong>${taskText}</strong>
            <button onclick="toggleEditTaskForm('${taskItem.id}')">Szerkesztés</button>
        `;
        taskItem.draggable = true;
        taskItem.id = 'task-' + Date.now();
        taskItem.setAttribute('ondragstart', 'drag(event)');
        document.getElementById('todo').appendChild(taskItem);

        // Form adatok törlése
        taskInput.value = '';
        document.getElementById('task-user').value = 'User1';
        toggleTaskForm(); // Form bezárása
    }
});
*/
// Feladat szerkesztése
document.getElementById('edit-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskDate = document.getElementById('edit-task-date').value;
    const taskComment = document.getElementById('edit-task-comment').value;

    if (currentTaskId) {
        const taskElement = document.getElementById(currentTaskId);
        
        // A dátum és a megjegyzés szerkesztése
        taskElement.querySelector('small')?.remove(); // Meglévő dátum és komment törlése
        const taskName = taskElement.querySelector('strong').textContent;
        const newContent = document.createElement('div');
        newContent.innerHTML = `
            <small>Dátum: ${taskDate ? taskDate : 'Nincs megadva'}</small><br>
            <small>Megjegyzés: ${taskComment ? taskComment : 'Nincs'}</small>
        `;
        taskElement.appendChild(newContent);

        // Mentési visszajelzés
        const saveMessage = document.getElementById('save-message');
        saveMessage.style.display = 'block';

        // Üzenet eltüntetése 3 másodperc után
        setTimeout(function() {
            saveMessage.style.display = 'none';
        }, 3000);

        toggleEditTaskForm(); // Bezárja a szerkesztési panelt
    }
});

// Drag-and-Drop funkciók
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    if (event.target.classList.contains('task-list')) {
        event.target.appendChild(taskElement);
    }
}

// Feladat törlése kukán keresztül
function deleteTask(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    taskElement.remove(); // Feladat törlése
}

document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toISOString().split('T')[0]; // Mai dátum ISO formátumban
    document.getElementById('edit-task-date').value = today; // Beállítja a mező értékét
});

/*

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/reports');
    const reports = await response.json();

    const todoList = document.getElementById('todo');

    reports.forEach(report => {
        const listItem = document.createElement('li');
        listItem.textContent = `${report.title} - ${report.description} (${report.tag}, ${report.location})`;
        listItem.id = `report-${report.id}`; // Set a unique ID for each report
        listItem.draggable = true; // Make the list item draggable
        listItem.ondragstart = drag; // Set up drag event
        todoList.appendChild(listItem);
    });
});

// Aktuálisan szerkesztett feladat ID-je
let currentTaskId = null;

// Rejtett űrlap megjelenítése/eltüntetése
function toggleTaskForm() {
    const formContainer = document.getElementById('task-form-container');
    formContainer.style.display = formContainer.style.display === 'none' || !formContainer.style.display ? 'block' : 'none';
}

// Szerkesztési panel megjelenítése/eltüntetése
function toggleEditTaskForm(taskId = null) {
    const editFormContainer = document.getElementById('edit-task-container');
    editFormContainer.style.display = editFormContainer.style.display === 'none' || !editFormContainer.style.display ? 'block' : 'none';
    if (taskId) {
        currentTaskId = taskId;
        const taskElement = document.getElementById(taskId);
        const taskDetailsName = document.getElementById('task-details-name');
        taskDetailsName.textContent = `Feladat: ${taskElement.querySelector('strong').textContent}`;
    }
}

// Feladat szerkesztése
document.getElementById('edit-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskDate = document.getElementById('edit-task-date').value;
    const taskComment = document.getElementById('edit-task-comment').value;

    if (currentTaskId) {
        const taskElement = document.getElementById(currentTaskId);
        
        // A dátum és a megjegyzés szerkesztése
        taskElement.querySelector('small')?.remove(); // Meglévő dátum és komment törlése
        const newContent = document.createElement('div');
        newContent.innerHTML = `
            <small>Dátum: ${taskDate ? taskDate : 'Nincs megadva'}</small><br>
            <small>Megjegyzés: ${taskComment ? taskComment : 'Nincs'}</small>
        `;
        taskElement.appendChild(newContent);

        // Mentési visszajelzés
        const saveMessage = document.getElementById('save-message');
        saveMessage.style.display = 'block';

        // Üzenet eltüntetése 3 másodperc után
        setTimeout(function() {
            saveMessage.style.display = 'none';
        }, 3000);

        toggleEditTaskForm(); // Bezárja a szerkesztési panelt
    }
});

// Drag-and-Drop funkciók
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    if (event.target.classList.contains('task-list')) {
        event.target.appendChild(taskElement); // Append the dragged task to the new list
    }
}

// Feladat törlése kukán keresztül
function deleteTask(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    taskElement.remove(); // Feladat törlése
}

// Set today's date on the edit form
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toISOString().split('T')[0]; // Mai dátum ISO formátumban
    document.getElementById('edit-task-date').value = today; // Beállítja a mező értékét
});


*/