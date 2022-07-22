const Direct = require("../models/Direct");

const getTheActualDirect = async (req, res) => {
  try {
    const direct = await Direct.findOne({
      isActive: true,
    });

    if (!direct) {
      return res.status(400).json({
        success: false,
        notOne: true,
      });
    }

    return res.status(200).json({
      success: true,
      direct,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

const getOlderDirects = async (req, res) => {
  try {
    const directs = await Direct.find({
      isActive: false,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      directs,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

module.exports = {
  getTheActualDirect,
  getOlderDirects,
};
