const Comments = require("../models/Comment");
const _ = require("lodash");

const getCommentByMedia = async ({ params }, res) => {
  try {
    const comments = await Comments.find({
      $or: [{ video: params.id }, { magazine: params.id }],
    }).sort({ createdAt: -1 });

    if (_.isEmpty(comments)) {
      return res.status(200).json({
        success: false,
        message: "Aucun commentaire pour le moment",
      });
    }

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const addComment = async ({ body }, res) => {
  try {
    const add = await Comments.create({
      name: body.name,
      comment: body.comment,
      video: body.video ? body.video : null,
      magazine: body.magazine ? body.magazine : null,
    });

    return res.status(200).json({
      success: true,
      message: "Votre commentaire a bien été ajouté",
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
  getCommentByMedia,
  addComment,
};
