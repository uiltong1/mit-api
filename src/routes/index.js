const express = require("express");
const { route } = require("express/lib/application");
const routes = express.Router();

const UserController = require("../controllers/UserController");
const AddressController = require("../controllers/AddressController");
const TechController = require("../controllers/TechController");
const ReportController = require("../controllers/ReportController");

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.get("/users/:user_id/addresses", AddressController.index);
routes.post("/users/:user_id/addresses", AddressController.store);

routes.get("/users/:user_id/techs", TechController.index);
routes.post("/users/:user_id/techs", TechController.store);
routes.delete("/users/:user_id/techs", TechController.destroy);

routes.get("/report", ReportController.show);

module.exports = routes;
