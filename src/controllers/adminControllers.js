const Category = require("../models/Category");
const Video = require("../models/Videos");
const Magazine = require("../models/Magazine");
const Admin = require("../models/Admin");
const Comments = require("../models/Comment");
const { createToken } = require("../services/authentication");

const login = async ({ body }, res) => {
  try {
    const checkAdmin = await Admin.findOne({ email: body.email });
    if (!checkAdmin) {
      return res.status(400).json({
        success: false,
        message: "Adresse email incorrecte",
      });
    }

    const checkPassword = await Admin.checkPassword(
      body.password,
      checkAdmin.password
    );

    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Mot de passe incorrecte" });
    }

    const code = createToken(checkAdmin._id);

    return res.status(200).json({
      success: true,
      message: "Connexion etablie, bon Retour !",
      email: checkAdmin.email,
      name: checkAdmin.firstName + " " + checkAdmin.lastName,
      code,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

const createCategory = async ({ body }, res) => {
  try {
    const check = await Category.findOne({ name: { $regex: body.name } });
    if (check) {
      return res.json({
        success: false,
        message: "La categorie existe deja",
      });
    }
    const create = await Category.create({ name: body.name });
    return res.json({
      success: true,
      message: "Categorie ajoutee avec succes",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

const getAllMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      magazines,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

const createMagazine = async ({ body }, res) => {
  try {
    const check = await Magazine.findOne({
      title: { $regex: body.title },
    });

    if (check) {
      return res.status(400).json({
        success: false,
        message: "Ce magazine existe déja",
      });
    }

    await Magazine.updateMany(
      {
        isLast: true,
      },
      {
        $set: {
          isLast: false,
        },
      }
    );

    await Magazine.create({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      isLast: true,
    });

    return res.status(200).json({
      success: true,
      message: "Magazine ajouté avec succès",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).populate("category");
    return res.status(200).json({ success: true, videos });
  } catch (error) {}
};

const createVideo = async ({ body }, res) => {
  try {
    const check = await Video.findOne({ title: { $regex: body.title } });
    if (check) {
      return res.status(400).json({
        success: false,
        message:
          "Une video avec un titre similaire a été enregistré dans la base de données",
      });
    }
    await Video.create({
      title: body.title,
      description: body.description,
      url: body.url,
      category: body.category,
    });
    return res.status(200).json({
      success: true,
      message: "La video a bien été enregistrée",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution du programme",
    });
  }
};

const editVideoStatus = async ({ params }, res) => {
  try {
    const video = await Video.findById(params.id);

    if (video && video.state === STATES.ACTIVE) {
      await Video.updateOne(
        {
          _id: video.id,
        },
        {
          $set: {
            state: STATES.INACTIVE,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: `La video ${video.title} a bien été désactivée , elle n'apparaitra plus sur le site`,
      });
    } else {
      await Video.updateOne(
        {
          _id: video.id,
        },
        {
          $set: {
            state: STATES.ACTIVE,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: `La video ${video.title} a bien été activée , elle apparaitra immediatement sur le site`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const deleteComment = async ({ params }, res) => {
  try {
    const del = await Comments.findOneAndDelete({ _id: params.id });
    return res.status(200).json({
      success: true,
      message: "Commentaire supprimé",
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
  login,
  getAllCategories,
  getAllMagazines,
  getAllVideos,
  createCategory,
  createMagazine,
  createVideo,
  editVideoStatus,
  deleteComment,
};
