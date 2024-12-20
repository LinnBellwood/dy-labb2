const my_server = "http://localhost:3000/users";

const fetchButton = document.getElementById("fall-down-btn");
const userListContainer = document.getElementById("user-list");
let isVisible = false;

async function fetchUsers() {
  try {
    const response = await fetch(my_server);

    if (!response.ok) {
      throw new Error("Error: ${response.status} - ${response.statusText}");
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Misslyckad hämtning: ", error);
  }
}

function displayUsers(users) {
  userListContainer.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "user-list";
  ul.setAttribute("aria-label", "Lista med användare");

  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "user-item";
    li.style.color = user.color;
    li.innerHTML = `
        <strong>Namn:</strong> ${user.firstName} ${user.lastName}`;
    ul.appendChild(li);
  });

  userListContainer.appendChild(ul);
}

fetchButton.addEventListener("click", async () => {
  if (!isVisible) {
    fetchUsers();
    userListContainer.style.display = "block";
    fetchButton.textContent = "Dölj Användare";
  } else {
    userListContainer.style.display = "none";
    fetchButton.textContent = "Visa Användare";
  }
  isVisible = !isVisible;
});
