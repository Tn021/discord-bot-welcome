require("dotenv").config();
const { Client, Attachment } = require("discord.js");
const fs = require("fs");
const path = require("path");
const text2png = require("text2png");

const client = new Client();

client.on("ready", async () => {
  console.log(`[app.js] > ${client.user.username} iniciado com sucesso!`);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.find((ch) => ch.name === process.env.DISCORD_CHANNEL);
  if (!channel) return;

  const memberName = member.user.username;
  const memberID = member.id;
  const imagePath = path.resolve(__dirname, 'src', 'images', `${memberID}.png`);
  const fontPath = path.resolve(__dirname, 'src', 'fonts', 'Bubblegum.ttf');

  fs.writeFileSync(imagePath,
    text2png(`Eai, \n${memberName}!`, {
      font: "90px Bubblegum",
      localFontPath: fontPath,
      localFontName: "Bubblegum",
      color: "teal",
      backgroundColor: "linen",
      lineSpacing: 10,
      padding: 20,
    })
  );

  const attachment = new Attachment(imagePath);
  channel.send(`${member}`, attachment);
});

client.on("guildMemberRemove", async (member) => {
  const memberID = member.id;
  const imagePath = path.resolve(__dirname, 'src', 'images', `${memberID}.png`);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
});

client.login(process.env.DISCORD_TOKEN);