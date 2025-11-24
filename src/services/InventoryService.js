class InventoryService {
  constructor() {
    this.pizzas = [
      { id: 1, name: "Pepperoni", price: 300, stock: 10 },
      { id: 2, name: "Hawaiian", price: 250, stock: 5 },
      { id: 3, name: "Cheese", price: 200, stock: 8 }
    ];
  }

 async getPizza(id) {
    return this.pizzas.find(p => p.id === id);
  }

 async reduceStock(id, qty) {
    const pizza = this.getPizza(id);
    if (!pizza) throw new Error("Pizza not found");
    if (pizza.stock < qty) throw new Error("Not enough stock");
    pizza.stock -= qty;
  }
}

module.exports = new InventoryService();
