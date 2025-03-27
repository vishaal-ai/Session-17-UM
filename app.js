let users = [];

document.getElementById("addUser").addEventListener("click", addUser);
document.getElementById("fetchUser").addEventListener("click", fetchUsers);

function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    users.forEach((user, index) => {
        let li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        li.addEventListener("click", () => updateUser(index));

        userList.appendChild(li);
    });
}

function addUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        return alert("Please enter both Name & Email.");
    }

    users.push({ name, email });
    displayUsers();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
            users = data.map(user => ({ name: user.name, email: user.email }));
            displayUsers();
        })
        .catch((error) => console.error("Error fetching users:", error));
}

function updateUser(index) {
    const newName = prompt("Enter new name:", users[index].name || "").trim();
    const newEmail = prompt("Enter new email:", users[index].email || "").trim();

    if (!newName || !newEmail) {
        return alert("Please enter valid details.");
    }

    users[index] = { name: newName, email: newEmail };
    displayUsers();
}
