const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      $and: [{ name: { $ne: "welcome" } }, { name: { $ne: "evenements" } }],
    });
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategories,
};
