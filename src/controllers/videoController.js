const Videos = require("../models/Videos");
const _ = require("lodash");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Videos.find({ isWelcome: false }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const getVideosByCategories = async ({ params }, res) => {
  try {
    let videos;
    if (!params || params === "") {
      videos = await Videos.find({});
    } else {
      videos = await Videos.find({
        category: params.id,
      });
    }

    if (_.isEmpty(videos)) {
      return res.status(400).json({
        success: true,
        message: "Aucune video retournée",
      });
    }
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const getWelcomeVideo = async (req, res) => {
  try {
    const video = await Videos.findOne({
      isWelcome: true,
    });

    if (!video) {
      return res.status(400).json({
        success: true,
        message: "Aucune video retournée",
      });
    }

    return res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const getSingleVideo = async ({ params }, res) => {
  try {
    const video = await Videos.findOne({ _id: params.id });
    if (!video) {
      return res.status(400).json({
        success: false,
        message: "La video est inaccessible",
      });
    }

    return res.status(200).json({
      success: true,
      video,
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
  getAllVideos,
  getVideosByCategories,
  getWelcomeVideo,
  getSingleVideo,
};
