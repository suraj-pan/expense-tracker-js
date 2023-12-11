document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');
  
    let expenses = [];
    let total = 0;
  
    expenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const expenseName = document.getElementById('expense').value;
      const expenseAmount = parseFloat(document.getElementById('amount').value);
      const expenseCategory = document.getElementById('category').value;
  
      if (expenseName && !isNaN(expenseAmount)) {
        const expense = {
          id: Date.now(),
          name: expenseName,
          amount: expenseAmount,
          category: expenseCategory
        };
  
        expenses.push(expense);
        addExpense(expense);
        updateTotal();
        expenseForm.reset();
      } else {
        alert('Please enter a valid expense name and amount.');
      }
    });
  
    function addExpense(expense) {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${expense.name}</strong>: $${expense.amount} (${expense.category})
        <button onclick="removeExpense(${expense.id})">Delete</button>
      `;
      expenseList.appendChild(item);
    }
  
    function updateTotal() {
      total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      totalExpenses.textContent = total.toFixed(2);
    }
  
    window.removeExpense = function(id) {
      expenses = expenses.filter(expense => expense.id !== id);
      updateExpenseList();
      updateTotal();
    };
  
    function updateExpenseList() {
      expenseList.innerHTML = '';
      expenses.forEach(addExpense);
    }
  
    updateTotal();
  });