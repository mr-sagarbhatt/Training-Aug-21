const nodemailer = require("nodemailer");

async function sendMail(recipients) {
  try {
    const to = await recipients;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "festofest.com@gmail.com",
        pass: "sagasaga",
      },
    });

    let info = await transporter.sendMail({
      from: "festofest.com@gmail.com",
      to: `${to.toString()}`,
      subject: "Sending email using NodeJS: NodeMailer",
      html: `
            <h1> NodeJS Test</h1>
            <h3>Sent by: Sagar Bhatt</h3>
            `,
    });

    console.log("to:", to);
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendMail,
};
