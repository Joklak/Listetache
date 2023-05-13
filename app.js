//Ajouter un écouteur d'événements sur le bouton "Ajouter" pour détecter lorsque l'utilisateur soumet un nouveau formulaire de tâche
//Récupérer la valeur de l'entrée de texte saisie par l'utilisateur et créer un nouvel élément li pour afficher la tâche dans la liste.

//Ajouter une icône de case à cocher à côté de chaque tâche pour permettre à l'utilisateur de marquer une tâche comme terminée.

//Ajouter un écouteur d'événements sur chaque case à cocher pour permettre à l'utilisateur de marquer une tâche comme terminée ou non terminée.

//Stocker la liste de tâches dans le stockage local du navigateur pour permettre à l'utilisateur de conserver sa liste de tâches même après la fermeture de l'application.

//Ajouter un bouton pour supprimer une tâche de la liste.

//Ajouter une option pour trier la liste de tâches par ordre alphabétique ou par état de réalisation.
const bouton = document.querySelector(".bouton_add");
const input = document.querySelector("input");
const liste = document.getElementById("task-list");

window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    liste.innerHTML = savedTasks;
  }

  const tasks = document.querySelectorAll("#task-list li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector("input[type=checkbox]");
    if (checkbox.checked) {
      task.classList.add("completed");
    }
  });
});

document.getElementById("add-task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const tache = input.value;

  const nouvelleTache = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = tache;
  nouvelleTache.appendChild(span);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "maCheckbox";
  nouvelleTache.appendChild(checkbox);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      nouvelleTache.classList.add("completed");
      console.log("La classe completed a été ajoutée à la tâche.");
    } else {
      nouvelleTache.classList.remove("completed");
      console.log("La classe completed a été retirée de la tâche.");
    }
    localStorage.setItem("tasks", liste.innerHTML);
  });

  liste.appendChild(nouvelleTache);

  input.value = "";

  localStorage.setItem("tasks", liste.innerHTML);
});
