class Order {
  constructor(id, customerName, items, totalPrice, status = "ordering", voucherCode = null) {
    this.id = id;
    this.customerName = customerName;
    this.items = items;
    this.totalPrice = totalPrice;
    this.status = status;
    this.voucherCode = voucherCode;
  }
}

module.exports = Order;
