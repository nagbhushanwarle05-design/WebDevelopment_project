let expenses = [];

const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const filter = document.getElementById("filter");

// Add Expense Function
addBtn.addEventListener("click", function() {

    let name = nameInput.value.trim();
    let amount = Number(amountInput.value);
    let category = categoryInput.value;

    // Validation
    if (name === "" || amountInput.value === "" ||
        !Number.isFinite(amount) || amount <= 0 ||
        category === "") {

        alert("Please enter valid details!");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    nameInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";

    displayExpenses();
});

// Display Expenses Function
function displayExpenses() {

    expenseList.innerHTML = "";

    let selectedCategory = filter.value;

    let filteredExpenses = expenses.filter(function(item) {
        return selectedCategory === "All" ||
               item.category === selectedCategory;
    });

    if (filteredExpenses.length === 0) {
        expenseList.textContent = "No expenses found.";
    }

    filteredExpenses.forEach(function(item) {

        let div = document.createElement("div");
        div.className = "expense";

        let details = document.createElement("div");

        let title = document.createElement("strong");
        title.textContent = item.name;

        let info = document.createElement("p");
        info.textContent =
            item.category + " - ₹" + item.amount.toFixed(2);

        details.appendChild(title);
        details.appendChild(info);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            deleteExpense(item.id);
        });

        div.appendChild(details);
        div.appendChild(deleteBtn);

        expenseList.appendChild(div);
    });

    updateTotal();
}

// Delete Expense Function
function deleteExpense(id) {

    expenses = expenses.filter(function(item) {
        return item.id !== id;
    });

    displayExpenses();
}

// Calculate Total Expenses
function updateTotal() {

    let total = expenses.reduce(function(sum, item) {
        return sum + item.amount;
    }, 0);

    totalAmount.textContent = "₹" + total.toFixed(2);
}

// Category Filter
filter.addEventListener("change", displayExpenses);