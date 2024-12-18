/// Lights-Function ///
function toggleClass(){

    const body = document.querySelector('body');
    body.classList.toggle('light');
    
    }

// Load saved data from localStorage (if any) or use default data
let tableEntries = JSON.parse(localStorage.getItem("tableEntries")) || [
    { type: 1, name: "Ex:1", amount: 1200},
    { type: 0, name: "Ex:2", amount: 100},
    { type: 0, name: "Ex:3", amount: 100},
];

// Function to update data expense summary
function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;
    }, 0);
    let totalExpense = tableEntries.reduce((ex, e) => {
        if (e.type === 0) ex += e.amount;
        return ex;
    }, 0);
    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

// Function to add new entry to the dataset and expense table 
function addItem() {
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

    // Input validation
    if (name.value === "" || Number(amount.value) === 0)
        return alert("Incorrect Entry");
    if (Number(amount.value) <= 0)
        return alert("Incorrect amount! can't add negative");

    // Push new data
    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
    });

    // Save updated data to localStorage
    localStorage.setItem("tableEntries", JSON.stringify(tableEntries));

    updateTable();
    name.value = "";
    amount.value = 0;
}

// Function to load all entry in the expense table
function loadItems(e, i) {
    let cls;

    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let c3 = row.insertCell(3);
    let c4 = row.insertCell(4);
    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    c4.innerHTML = "&#9746;"; // Delete button (× symbol)
    c4.classList.add("zoom");
    c4.addEventListener("click", () => del(e));
    if (e.type == 0) {
        cls = "red";
        c3.innerHTML = "&#10138;"; // Expense arrow
    } else {
        cls = "green";
        c3.innerHTML = "&#10136;"; // Income arrow
    }
    c3.style.color = cls;
}

// Clear the table before updation
function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}

// Function to delete a specific entry
function del(el) {
    // Remove the entry from tableEntries
    tableEntries = tableEntries.filter((e) => e.name !== el.name);

    // Save updated data to localStorage
    localStorage.setItem("tableEntries", JSON.stringify(tableEntries));

    // Rebuild the table
    remove();
    tableEntries.map((e, i) => loadItems(e, i));
    updateSummary();
}

// To render all entries
function updateTable() {
    remove();
    tableEntries.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}

// Initial load of the table
updateTable();


