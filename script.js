let names = JSON.parse(localStorage.getItem('names')) || [];
let lastPicked = null;
let deleteAfterPick = false;

document.getElementById("option").addEventListener("click", function() {
    deleteAfterPick = !deleteAfterPick;
    this.textContent = deleteAfterPick ? "Delete After Picked: ON" : "Delete After Picked: OFF";
});

function addName() {
    const input = document.getElementById("name-input");
    const name = input.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        updateList();
        input.value = "";
        saveData();
    }
}

function updateList() {
    const list = document.getElementById("name-list");
    list.innerHTML = names.map((name, index) => 
        `<li class='list-group-item d-flex justify-content-between align-items-center'>
            ${name} 
            <button class='btn btn-danger btn-sm' onclick='deleteName(${index})'>
                <i class="fas fa-trash"></i>
            </button>
        </li>`
    ).join("");
}

function pickRandom() {
    if (names.length === 0) return;
    const index = Math.floor(Math.random() * names.length);
    lastPicked = names[index];
    document.getElementById("selected-name").innerText = `Lucky Winner! ${lastPicked}`;
    
    if (deleteAfterPick) {
        names.splice(index, 1);
        updateList();
        saveData();
    }
}

function deleteName(index) {
    names.splice(index, 1);
    updateList();
    saveData();
}

function saveData() {
    localStorage.setItem('names', JSON.stringify(names));
}

window.onload = updateList;

document.getElementById("delete-all").addEventListener("click", function() {
    names = [];
    updateList(); 
    saveData(); 
});
