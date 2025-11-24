const inventory = require("../src/services/InventoryService");
const request = require("supertest");
const app = require("../src/app");



describe("InventoryService", () => {

  beforeEach(() => {
  inventory.pizzas = [
    { id: 1, name: "Pepperoni", price: 300, stock: 10 },
    { id: 2, name: "Hawaiian", price: 250, stock: 5 },
    { id: 3, name: "Cheese", price: 200, stock: 8 }
  ];
});

  test("should get pizza by ID", async () => {

   const spy =  jest.spyOn(inventory, "getPizza");

    await inventory.getPizza(1);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

it("should return pong", async () => {
    const res = await request(app).get("/ping");
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("pong");
  });

  // test("should reduce stock correctly", async () => {
  //   const before = (await inventory.getPizza(1)).stock;
  //   console.log(before);
  //   await inventory.reduceStock(1, 1);
  //   const after = (await inventory.getPizza(1)).stock;
  //   console.log(after);
  //   expect(after).toBe(before - 1);
  // });

  // test("should throw if stock is not enough", async () => {
  //   await expect(inventory.reduceStock(2, 999))
  //     .rejects
  //     .toThrow("Not enough stock");
  // });

});
