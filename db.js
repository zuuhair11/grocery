'use strict';

export default class Db {
    constructor(dbName = 'groceries') {
        this.dbName = dbName;
    }

    getGroceries() {
        const data = localStorage.getItem(this.dbName);
        return data ? JSON.parse(data) : [];
    }

    saveGroceries(groceryArray) {
        localStorage.setItem(this.dbName, JSON.stringify(groceryArray));
    }

    addGrocery(item) {
        const groceries = this.getGroceries();
        groceries.push(item);
        this.saveGroceries(groceries);
    }

    deleteGrocery(groceryId) {
        const groceries = this.getGroceries();
        const updated = groceries.filter( grocery => grocery.id !== groceryId);
        this.saveGroceries(updated);
    }

    toggleCompleted(groceryId) {
        const groceries = this.getGroceries()
            .map( grocery => {
                if (grocery.id === groceryId) {
                    return { ...grocery, completed: !grocery.completed };
                }
                return grocery;
        });
        this.saveGroceries(groceries);
    }
}
