const express = require("express");
const Pool = require("../model/poolModel");
const { auth, voterAuth } = require("../middleware/auth");

const router = new express.Router();

router.post("/pool", async (req, res) => {
  const {
    creatorEmail,
    creatorName,
    poolQuestion,
    poolOptions,
    expireAt = 24,
  } = req.body;
  const pool = new Pool({
    poolQuestion,
    creatorEmail,
    creatorName,
    poolOptions,
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * expireAt),
  });
  try {
    await pool.save();
    res.status(201).send({
      success:
        "Successfully created your pool. Copy the link below and share it among voters",
      link: `https://pool-creator.herokuapp.com/pools/${pool._id}`,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "Can't make your vote. Fill all the required field and try again.",
    });
  }
});

router.get("/pool/:id", auth, (req, res) => {
  res.status(200).send({ pool: req.pool });
});

router.patch("/pool/:id", voterAuth, async (req, res) => {
  const { id } = req.params;
  const { chooseOption, voterEmail } = req.body;
  try {
    const pool = req.pool;
    const options = req.options;
    pool.poolOptions[options].vote = pool.poolOptions[options].vote + 1;
    const totalVote = pool.poolOptions
      .map((option) => option.vote)
      .reduce((acc, item) => acc + item);
    pool.totalVote = totalVote;
    pool.voters = pool.voters.concat({
      voterEmail,
      chooseOption,
      voterIP: req.ip,
    });
    await pool.save();
    res.status(201).send({
      poolOptions: pool.poolOptions,
      totalVote: pool.totalVote,
      success: "You have voted successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Can't process your vote!!Try again" });
  }
});

module.exports = router;
