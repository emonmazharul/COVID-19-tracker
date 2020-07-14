const request = require("supertest");
const app = require("../app");

describe("all success test cases", () => {
  test("should create a pool with 201", async () => {
    const response = await request(app)
      .post("/pool")
      .send({
        poolQuestion: "What is your name",
        creatorEmail: "test@gmail.com",
        creatorName: "Admin",
        poolOptions: [
          {
            optionName: "option one",
          },
          {
            optionName: "option two",
          },
        ],
        expireAt: 48,
      })
      .expect(201);
  });
  test("should get the pool with correct id", async () => {
    const response = await request(app)
      .get("/pool/5f0c73d99b86880cdc463243")
      .expect(200);
  });
  test("should give vote without error", async () => {
    const response = await request(app)
      .patch("/pool/5f0c73d99b86880cdc463243")
      .send({
        chooseOption: "option one",
        voterEmail: "mazharul@gmail.com",
      })
      .expect(201);
  });
});

describe("run alll test with negative response", () => {
  test("should not create a pool without require filed", async () => {
    const response = await request(app)
      .post("/pool")
      .send({
        creatorName: "emon",
        creatorEmail: "emon@gmail.com",
      })
      .expect(400);
  });

  test("should not get a pool without correct id", async () => {
    const response = await request(app)
      .get("/pool/5f0c73d99b86880cdc46dda6")
      .expect(404);
  });

  test("should not give vote without correct option ", async () => {
    const response = await request(app)
      .patch("/pool/5f0c73d99b86880cdc463243")
      .send({
        chooseOption: "onjafksj",
        voterEmail: "three@gmail.com",
      })
      .expect(406);
  });
  test("should not give vote without a new email", async () => {
    const response = await request(app)
      .patch("/pool/5f0c73d99b86880cdc463243")
      .send({
        chooseOption: "option one",
        voterEmail: "mazharul@gmail.com",
      })
      .expect(406);
  });
  test("should not give vote without correct id", async () => {
    const response = await request(app)
      .patch("/pool/5f0c73d99b86880cdc465243")
      .send({
        chooseOption: "option one",
        voterEmail: "threefourdadf@gmail.com",
      })
      .expect(406);
  });
});
