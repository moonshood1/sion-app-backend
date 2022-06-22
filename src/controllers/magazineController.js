const Magazine = require("../models/Magazine");

const getAllMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      magazines,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const getLastMagazine = async (req, res) => {
  try {
    const magazine = await Magazine.findOne({ isLast: true });

    return res.status(200).json({
      success: true,
      magazine,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

module.exports = {
  getLastMagazine,
  getAllMagazines,
};
