const Event = require("../models/Events");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const getTopEvent = async (req, res) => {
  try {
    const event = await Event.find({})
      .sort({
        createdAt: -1,
      })
      .limit(1);
    return res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Une erreur est survenue lors de l'execution de la requete",
    });
  }
};

const getSingleEvent = async ({ params }, res) => {
  try {
    const event = await Event.findById(params.id);
    return res.status(200).json({
      success: true,
      event,
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
  getAllEvents,
  getSingleEvent,
  getTopEvent,
};
