const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusElement = document.getElementById("status");
const usersList = document.getElementById("users-list");

let users = []; // stores the fetched users so the filter needs no new request

async function loadUsers() {
    loadButton.disabled = true;
    statusElement.className = "";
    statusElement.textContent = "Loading users...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        // Test the error path by temporarily breaking the URL above,
        // e.g. fetch("https://jsonplaceholder.typicode.com/users-broken")
        // -> response.ok is false and the catch block runs.
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        users = await response.json();
        statusElement.className = "success";
        statusElement.textContent = "Successfully loaded " + users.length + " users.";
        renderUsers(users);
    } catch (error) {
        statusElement.className = "error";
        statusElement.textContent = "Failed to load users: " + error.message;
        users = [];
        renderUsers(users);
    } finally {
        loadButton.disabled = false;
    }
}

function renderUsers(list) {
    usersList.innerHTML = "";

    if (list.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No users match your filter.";
        usersList.appendChild(emptyItem);
        return;
    }

    list.forEach(function (user) {
        const item = document.createElement("li");

        const name = document.createElement("strong");
        name.textContent = user.name;

        const email = document.createElement("span");
        email.textContent = "Email: " + user.email;

        const city = document.createElement("span");
        city.textContent = "City: " + user.address.city;

        const company = document.createElement("span");
        company.textContent = "Company: " + user.company.name;

        item.appendChild(name);
        item.appendChild(email);
        item.appendChild(city);
        item.appendChild(company);

        usersList.appendChild(item);
    });
}

loadButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", function () {
    const query = filterInput.value.trim().toLowerCase();

    const filtered = users.filter(function (user) {
        return user.name.toLowerCase().includes(query);
    });

    renderUsers(filtered);
});