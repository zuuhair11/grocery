'use strict';

let filter = 'all';
let groceries = [

];

const groceryFormEl = document.querySelector('.grocery-form');
const groceryInputEl = document.getElementById('groceryInput');
const groceryListEl = document.getElementById('groceryList');
const filterBtnEls = document.querySelectorAll('.filter-btn');
const emptyStateEl = document.querySelector('.empty-state');

// Handle filter changes
filterBtnEls.forEach( btn => {
    btn.addEventListener('click', (e) => {
        filterBtnEls.forEach( b => b.classList.remove('active'));
        e.target.classList.add('active');

        filter = e.target.dataset.filter;
        render();
    });
});

function getFilteredGroceries() {
    switch (filter) {
        case 'active':
            return groceries.filter( item => !item.completed);
        case 'completed':
            return groceries.filter( item => item.completed);
        default:
            return groceries;
    }
}

function render() {
    groceryListEl.innerHTML = '';
    const filteredGroceries = getFilteredGroceries();

    filteredGroceries.forEach( item => {
        const li = document.createElement('li');
        li.classList.add('grocery-item');
        if (item.completed) li.classList.add('completed');
        li.dataset.id = item.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => toggleComplete(item.id));

        const span = document.createElement('span');
        span.classList.add('grocery-item-text');
        span.textContent = item.grocery;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteGrocery(item.id));

        li.append(checkbox, span, deleteBtn);
        groceryListEl.appendChild(li);
    });
}

function toggleComplete(id) {
    const item = groceries.find( item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        render();
    }
}

function deleteGrocery(id) {
    groceries = groceries.filter( item => item.id !== id);
    render();
}

// Handle adding new grocery item
groceryFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = groceryInputEl.value.trim();
    if (input) {
        groceries.push({
            id: Date.now(),
            grocery: input,
            completed: false
        });

        groceryInputEl.value = '';
        render();
    } else {
        alert('Please enter a valid item.');
    }
});


// Initial render
if (groceries.length) {
    render();
} else {
    emptyStateEl.style.display = 'block'
}
