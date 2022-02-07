const User = require("../models/User");
const Tech = require("../models/Tech");
const { response } = require("express");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: "techs",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user.techs);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;
    console.log(name);
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const [tech] = await Tech.findOrCreate({
      where: { name },
    });

    await user.addTech(tech);

    return res.status(200).json(tech);
  },

  async destroy(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const tech = await Tech.findOne({
      where: { name },
    });

    await user.removeTech(tech);

    return res.status(204).json();
  },
};
