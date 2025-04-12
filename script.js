'use strict';

import Db from './db.js';
const db = new Db();

let filter = 'all';

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
            return db.getGroceries().filter( item => !item.completed);
        case 'completed':
            return db.getGroceries().filter( item => item.completed);
        default:
            return db.getGroceries();
    }
}

function render() {
    groceryListEl.innerHTML = '';
    const filteredGroceries = getFilteredGroceries();

    // Show or hide the empty state
    if (db.getGroceries().length === 0) {
        emptyStateEl.style.display = 'block';
    } else {
        emptyStateEl.style.display = 'none';
    }

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
    db.toggleCompleted(id);
    render();
}

function deleteGrocery(id) {
    db.deleteGrocery(id);
    render();
}

// Handle adding new grocery item
groceryFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = groceryInputEl.value.trim();
    if (input) {
        db.addGrocery({
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
render();
