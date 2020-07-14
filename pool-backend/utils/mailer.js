const nodemailer = require("nodemailer");

async function mailer(receiverEmail, body) {
  const sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mazharuli1999@gmail.com",
      pass: "bangla098@",
    },
  });

  try {
    const response = await sender.sendMail({
      from: "mazharuli1999@gmail.com",
      to: receiverEmail,
      subject: "Your vote result form voter.com",
      text: "Your vote result from voters.com",
      html: body,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  mailer,
};
