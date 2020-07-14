const Pool = require("../model/poolModel");

async function auth(req, res, next) {
  const { id } = req.params;
  try {
    const pool = await Pool.findById(id);
    if (pool.poolEnded) {
      return res.status(200).send({
        pool: pool,
        message:
          "This Pool has ended.You can't vote anymore.We will send the result to the creator and delete this pool",
      });
    }
    const currentDate = new Date();
    const poolExpireDate = new Date(pool.expireAt);
    if (currentDate > poolExpireDate) {
      pool.poolEnded = true;
      await pool.save();
      return res.status(200).send({
        pool: pool,
        message:
          "This Pool has ended.You can't vote anymore.We will send the result to the creator and delete this pool",
      });
    }
    req.pool = pool;
    next();
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .send({ error: "Don't find any ongoing vote on this link." });
  }
}

async function voterAuth(req, res, next) {
  const { id } = req.params;
  const { chooseOption, voterEmail } = req.body;
  try {
    const pool = await Pool.findById(id);
    if (pool.poolEnded) {
      return res.status(406).send({ error: "This pool has finished!!" });
    }
    //if already voted with email or ip we give an error
    const hasVoted = pool.voters.find(
      (voter) => voter.voterIP === req.ip || voter.voterEmail === voterEmail
    );
    if (hasVoted) throw new Error("You already have voted");
    // if givis an invalid option we give a error back.
    const options = pool.poolOptions.findIndex(
      (option) => option.optionName === chooseOption
    );
    if (options === -1) throw new Error("There is no such option");
    //or we will proceed
    req.pool = pool;
    req.options = options;
    next();
  } catch (e) {
    console.log(e);
    res.status(406).send({ error: e.message });
  }
}

module.exports = {
  auth,
  voterAuth,
};
