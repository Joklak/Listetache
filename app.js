const bouton = document.querySelector(".bouton_add");
const input = document.querySelector("input");
const liste = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((savedTask) => {
      const { content, completed, important, id } = savedTask;
      const nouvelleTache = createTaskElement(
        content,
        completed,
        important,
        id
      );
      liste.appendChild(nouvelleTache);
    });
  }
});

document.getElementById("add-task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const tache = input.value;

  // Créer une nouvelle tâche et l'ajouter à la liste
  const nouvelleTache = createTaskElement(
    tache,
    false,
    false,
    "checkbox-" + Date.now()
  );
  liste.appendChild(nouvelleTache);

  // Enregistrer la nouvelle liste de tâches dans localStora
  saveTasksToLocalStorage();

  // Réinitialiser le champ de saisie
  input.value = "";
});

function createTaskElement(content, completed, important, id) {
  const nouvelleTache = document.createElement("li");

  // Ajouter le contenu de la tâche
  const span = document.createElement("span");
  span.textContent = content;
  nouvelleTache.appendChild(span);

  // Ajouter la checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.id = id;
  nouvelleTache.appendChild(checkbox);

  // Ajouter le bouton "Supprimer"
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("supprimer-button");
  nouvelleTache.appendChild(deleteButton);

  // Ajouter le bouton "Important"
  const importantButton = document.createElement("button");
  importantButton.innerHTML = '<i class="fas fa-star"></i>';
  importantButton.classList.add("important-button");
  nouvelleTache.appendChild(importantButton);

  // Configurer les écouteurs d'événements
  addEventListenersToTask(
    nouvelleTache,
    checkbox,
    deleteButton,
    importantButton
  );

  // Configurer les classes CSS
  if (completed) nouvelleTache.classList.add("completed");
  if (important) nouvelleTache.classList.add("important");

  return nouvelleTache;
}

function addEventListenersToTask(
  nouvelleTache,
  checkbox,
  deleteButton,
  importantButton
) {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) nouvelleTache.classList.add("completed");
    else nouvelleTache.classList.remove("completed");

    saveTasksToLocalStorage();
  });

  deleteButton.addEventListener("click", () => {
    liste.removeChild(nouvelleTache);
    saveTasksToLocalStorage();
  });

  importantButton.addEventListener("click", () => {
    nouvelleTache.classList.toggle("important");
    saveTasksToLocalStorage();
  });
}

function saveTasksToLocalStorage() {
  const tasks = Array.from(liste.children).map((task) => {
    const checkbox = task.querySelector("input[type=checkbox]");
    const isImportant = task.classList.contains("important");
    return {
      id: checkbox.id,
      content: task.querySelector("span").textContent,
      completed: checkbox.checked,
      important: isImportant,
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
