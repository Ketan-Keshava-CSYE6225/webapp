const request = require("supertest");
const { app } = require("../src/app.js");
const { findUserById, updateUserByUsername } = require("../src/dataAccessLayer/userDAL.js");

let appServer;

beforeAll(() => {
  appServer = app.listen();
});

afterAll(() => {
  appServer.close();
});

/* Application Health Status check */

describe("Test 1 | HealthCheck Sucess", () => {
  it("Expect 200 for success", async () => {
    const res = await request(app).get("/healthz");
    expect(res.statusCode).toEqual(200);
  });
});

/* User Module Integration Test */

const firstName = "Ketan";
const lastName = "Keshava";
const strongPassword = "Password@1";
const email = "keshava.ke4@example.com";

const createBasicAuth = (username, password) => {
  return "Basic " + Buffer.from(username + ":" + password).toString("base64");
};

const userPath = "/v2/user";
const selfPath = "/self";

describe("Test 2 | Create User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const createUserRequestBody = {
      first_name: firstName,
      last_name: lastName,
      password: strongPassword,
      username: email,
    };
    const createUserResponse = await request(app)
      .post(userPath)
      .send(createUserRequestBody);
    expect(createUserResponse.statusCode).toEqual(201);

    const createUser = await findUserById(createUserResponse.body.id);
    const updatedUserData = {};
    updatedUserData.user_verification_status = true;
    const updatedUser = await updateUserByUsername(createUser.username, updatedUserData);

    const fetchUserResponse = await request(app)
      .get(userPath + selfPath)
      .set("Authorization", createBasicAuth(email, strongPassword));
    expect(fetchUserResponse.statusCode).toEqual(200);
    expect(fetchUserResponse.body.first_name).toEqual(firstName);
    expect(fetchUserResponse.body.last_name).toEqual(lastName);
    expect(fetchUserResponse.body.username).toEqual(email);
  });
});

describe("Test 3 | Update User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const updateUserRequestBody = {
      first_name: "Keth",
      last_name: "kesh",
    };
    const updateUserResponse = await request(app)
      .put(userPath + selfPath)
      .send(updateUserRequestBody)
      .set("Authorization", createBasicAuth(email, strongPassword));
    expect(updateUserResponse.statusCode).toEqual(204);

    const fetchUserResponse = await request(app)
      .get(userPath + selfPath)
      .set("Authorization", createBasicAuth(email, strongPassword));
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
    expect(fetchUserResponse.body.username).toEqual(email);
  });
});
