jest.mock("../src/services/InventoryService");
jest.mock("../src/services/VoucherService");


const inventory = require("../src/services/InventoryService");
const voucher = require("../src/services/VoucherService");

const OrderService = require("../src/services/OrderService");
const orderService = new OrderService();

describe("OrderService", () => {

    beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create an order successfully", async () => {

    // mock pizza found
    inventory.getPizza.mockResolvedValue({ id: 1, price: 300, stock: 10 });

    // mock stock reduction
    inventory.reduceStock.mockResolvedValue(true);

    // mock voucher
    voucher.generateVoucher.mockResolvedValue({ code: "V-TEST" });

    const order = await orderService.createOrder("Min Khant", [
      { pizzaId: 1, qty: 2 }
    ]);

    expect(order.totalPrice).toBe(600);
    expect(order.voucherCode).toBe("V-TEST");

    expect(inventory.getPizza).toHaveBeenCalledTimes(1);
    expect(inventory.reduceStock).toHaveBeenCalledTimes(1);
    expect(voucher.generateVoucher).toHaveBeenCalledTimes(1);
  });

  test("should update order status", async () => {
    const updated = await orderService.updateStatus(1, "processing");
    expect(updated.status).toBe("processing");
  });

  test("should throw error for invalid pizza ID", async () => {
    inventory.getPizza.mockResolvedValue(null);
    await expect(orderService.createOrder("Aung", [
      { pizzaId: 999, qty: 1 }
    ])).rejects.toThrow("Pizza not found");
  });

  test("should throw error if pizza not found", async () => {
    inventory.getPizza.mockResolvedValue(null);
    await expect(orderService.createOrder("John", [{ pizzaId: 90, qty: 1 }])).rejects.toThrow("Pizza not found");
  })
});
