const Users = require("../models/User");

const registerToNewsLetter = async ({ body }, res) => {
  try {
    const user = await Users.findOne({
      email: {
        $regex: body.email,
      },
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "Cette adresse email a deja été inscrite a la newsletter, veuillez la modifier",
      });
    }

    await Users.create({
      email: body.email,
    });

    return res.json({
      success: true,
      message: "Votre adresse email a bien été enregistrée a la newsletter",
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
  registerToNewsLetter,
};
