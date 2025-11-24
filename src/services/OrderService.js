const Order = require("../entities/Order");
const inventory = require("./InventoryService");
const voucherService = require("./VoucherService");

class OrderService {
  constructor() {
    this.orders = [];
    this.currentId = 1;
  }

 async createOrder(customerName, orderItems) {
    let total = 0;

    for (const item of orderItems) {
      const pizza = await inventory.getPizza(item.pizzaId);
      if (!pizza) throw new Error("Pizza not found");

      await inventory.reduceStock(item.pizzaId, item.qty);
      total += pizza.price * item.qty;
    }

    const voucher = await voucherService.generateVoucher();

    const newOrder = new Order(
      this.currentId++,
      customerName,
      orderItems,
      total,
      "ordering",
      voucher.code
    );

    this.orders.push(newOrder);
    return newOrder;
  }

 async updateStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === parseInt(orderId));
    if (!order) throw new Error("Order not found");

    order.status = newStatus;
    return order;
  }
}

module.exports = OrderService;
