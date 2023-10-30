const userModel = require("../models/user");
// const faker = require("@faker-js/faker");

async function importUser() {
  const payload = {
    name: "name",
    email: "rahulrajesh474@gmail.com",
    password: "password",
    avatar: {
      public_id: "This is sample id",
      url: "ProfilePic Url",
    },
  };
  await userModel.insertMany(payload);
}
module.exports = { importUser };
