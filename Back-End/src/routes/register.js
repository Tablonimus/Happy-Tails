const { Router } = require("express");
const { register } = require("../utils/controllers/register.js");
const nodemailer = require("nodemailer");

const router = Router();

router.post("/", async (req, res, next) => {
  let {
    first_name,
    last_name,
    username,
    email,
    password,
    image,
    telephone,
    about,
    place,
    place_longitude,
    place_latitude,
    donations,
    interestedUsers,
  } = req.body;
  try {
    const postUser = await register(
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about,
      place,
      place_longitude,
      place_latitude,
      donations,
      interestedUsers
    );

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "happytailshp@gmail.com",
        pass: `${process.env.NMAILER_PASSWORD2}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let contentHTML = `
    <img src = "https://cdn-icons-png.flaticon.com/512/194/194279.png" style="width:100px;"/>
  
    <h1>Hola!, ${first_name} ${last_name}.🐰
    🐻 Gracias por haber elegido Happy Tails para tus compañeros animales.🐵
          🐈‍⬛Deseamos que todas tus mascotas encuentren su cola feliz.🐶 
    Atentamente HT`;

    let info = await transporter.sendMail({
      from: "'HappyTails'<happytailshp@gmail.com>",
      to: email,
      subject: "Bienvenido",
      html: contentHTML,
    });

    console.log("message sent", info.messageId);
    res.send(postUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
