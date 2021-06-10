const db = require("../models/pg");

const getResults = async (req, res) => {
  try {
    const data = await db.result.findAll({
      attributes: ["id", "homeScore", "awayScore"],
      include: {
        model: db.match,
        as: "match",
        attributes: ["id", "kickoff"],
        include: [
          { model: db.team, attributes: ["name"], as: "homeTeam" },
          { model: db.team, attributes: ["name"], as: "awayTeam" },
        ],
      },
    });
    res.status(200).json(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  getResults,
};
