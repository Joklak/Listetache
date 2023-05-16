const bouton = document.querySelector(".bouton_add");
const input = document.querySelector("input");
const liste = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    liste.innerHTML = savedTasks;

    const tasks = document.querySelectorAll("#task-list li");
    tasks.forEach((task) => {
      const checkbox = task.querySelector("input[type=checkbox]");
      const isChecked = localStorage.getItem(checkbox.id) === "true";
      if (isChecked) {
        checkbox.checked = true;
        task.classList.add("completed");
      } else {
        checkbox.checked = false;
        task.classList.remove("completed");
      }
    });
  }
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
  checkbox.id = "checkbox-" + Date.now();
  nouvelleTache.appendChild(checkbox);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  nouvelleTache.appendChild(deleteButton);

  const importantButton = document.createElement("button");
  importantButton.textContent = "Important";
  nouvelleTache.appendChild(importantButton);

  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    if (isChecked) {
      nouvelleTache.classList.add("completed");
    } else {
      nouvelleTache.classList.remove("completed");
    }
    localStorage.setItem(checkbox.id, isChecked.toString());
    localStorage.setItem("tasks", liste.innerHTML);
  });

  deleteButton.addEventListener("click", () => {
    liste.removeChild(nouvelleTache);
    localStorage.removeItem(checkbox.id);
    localStorage.setItem("tasks", liste.innerHTML);
  });

  importantButton.addEventListener("click", () => {
    nouvelleTache.classList.toggle("important");
  });

  const isChecked = checkbox.checked;
  if (isChecked) {
    nouvelleTache.classList.add("completed");
  }

  liste.appendChild(nouvelleTache);

  input.value = "";

  localStorage.setItem(checkbox.id, isChecked.toString());
  localStorage.setItem("tasks", liste.innerHTML);
});
