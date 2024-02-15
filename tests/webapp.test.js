const request = require("supertest");
const { app } = require("../src/app.js");

let appServer;

beforeAll(() => {
  appServer = app.listen();
});

afterAll(() => {
  appServer.close();
});

/* Application Health Status check */

const healthzPath = "/healthz";

describe("Test 1 | HealthCheck Sucess", () => {
  it("Expect 200 for success", async () => {
    const res = await request(app).get(healthzPath);
    expect(res.statusCode).toEqual(503);
  });
});

/* User Module Integration Test */

const userPath = "/v1/user";
const selfPath = "/v1/user/self";

const rightFormatFirstName = "Ketan";
const rightFormatLastName = "Keshava";
const rightFormatPassword = "Password@1";
const rightFormatEmail = "keshava.ke07@example.com";

const createBasicAuth = (username, password) => {
  return "Basic " + Buffer.from(username + ":" + password).toString("base64");
};

describe("Test 2 | Create User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const createUserRequestBody = {
      first_name: rightFormatFirstName,
      last_name: rightFormatLastName,
      password: rightFormatPassword,
      username: rightFormatEmail,
    };
    const createUserResponse = await request(app)
      .post(userPath)
      .send(createUserRequestBody);
    expect(createUserResponse.statusCode).toEqual(201);

    const fetchUserResponse = await request(app)
      .get(selfPath)
      .set("Authorization", createBasicAuth(rightFormatEmail, rightFormatPassword));
    expect(fetchUserResponse.statusCode).toEqual(200);
    expect(fetchUserResponse.body.first_name).toEqual(rightFormatFirstName);
    expect(fetchUserResponse.body.last_name).toEqual(rightFormatLastName);
    expect(fetchUserResponse.body.username).toEqual(rightFormatEmail);
  });
});

describe("Test 3 | Update User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const updateUserRequestBody = {
      first_name: "Ket",
      last_name: "Kesh",
    };
    const updateUserResponse = await request(app)
      .put(selfPath)
      .send(updateUserRequestBody)
      .set("Authorization", createBasicAuth(rightFormatEmail, rightFormatPassword));
    expect(updateUserResponse.statusCode).toEqual(204);

    const fetchUserResponse = await request(app)
      .get(selfPath)
      .set("Authorization", createBasicAuth(rightFormatEmail, rightFormatPassword));
    expect(fetchUserResponse.statusCode).toEqual(200);
    expect(fetchUserResponse.body.account_created).not.toEqual(
      fetchUserResponse.body.account_updated
    );
    expect(fetchUserResponse.body.first_name).toEqual(
      updateUserRequestBody.first_name
    );
    expect(fetchUserResponse.body.last_name).toEqual(
      updateUserRequestBody.last_name
    );
    expect(fetchUserResponse.body.username).toEqual(rightFormatEmail);
  });
});
